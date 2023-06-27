import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../models/token.model';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {MessageModel} from "../models/chat/message.model";
import {SearchQuery} from "../../search/models/search-query";
import {SlotModel} from "../models/activity/slot.model";
import {DateService} from "./utils/date.service";
import {SlotDetailModel} from "../models/activity/slot-detail.model";
import {ConversationModel} from "../models/chat/conversation.model";
import {ConversationMessageModel} from "../models/chat/conversation-message.model";
import {BookingModel} from "../models/activity/booking.model";
import {SlotProposedModel} from "../models/activity/slot-proposed.model";
import {SlotPreview} from "../../planning/models/slot-preview";
import {LocationModel} from "../models/activity/location.model";
import {TypeModel} from "../models/activity/type-model";
import {map} from "rxjs/operators";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiService {
  readonly API_URL = environment.url_api;

  constructor(
    private http: HttpClient,
    private dateService: DateService
  ) {
  }

  apiUrlFormUri(uri: string): string {
    return this.API_URL + uri;
  }

  // Login
  login(username: string, password: string): Observable<TokenModel> {
    return this
      .http
      .post<TokenModel>(
        this.apiUrlFormUri('/public/login'),
        {username, password}
      );
  }

  reconnect(token: string): Observable<TokenModel> {
    return this
      .http
      .post<TokenModel>(
        this.apiUrlFormUri('/public/login/refresh'),
        {
          refresh_token: token,
        }
      );
  }

  getCurrentUser(): Observable<UserModel> {
    return this
      .http
      .get<UserModel>(this.apiUrlFormUri('/user/information'));
  }

  // Register
  registerCustomer(username: string, password: string): Observable<UserModel> {
    return this
      .http
      .post<UserModel>(
        this.apiUrlFormUri('/public/register/customer'),
        {username, password}
      );
  }

  registerMonitor(
    firstname: string,
    lastname: string,
    phone: string,
    username: string,
    password: string
  ): Observable<UserModel> {
    return this
      .http
      .post<UserModel>(
        this.apiUrlFormUri('/public/register/monitor'),
        {
          firstname,
          lastname,
          phone,
          username,
          password
        }
      );
  }

  checkAccountExist(email: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.apiUrlFormUri('/public/register/available'), {username: email});
  }

  // Password Reset
  resetPasswordRequest(email: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.apiUrlFormUri('/public/reset_password'), {username: email});
  }

  checkPasswordResetTokenValidity(token: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.apiUrlFormUri('/public/reset_password/validity'), {token});
  }

  resetPassword(token: string, password: string): Observable<MessageModel> {
    return this
      .http
      .patch<MessageModel>(this.apiUrlFormUri('/public/reset_password'), {token, password});
  }

  // Account Management
  updatePassword(token: string, oldPassword: string, newPassword: string): Observable<MessageModel> {
    return this
      .http
      .patch<MessageModel>(
        this.apiUrlFormUri('/public/user/password_update'),
        {oldPassword, newPassword},
      );
  }

  // Search
  findSlots(query: SearchQuery) {
    const uri = '/public/slots/' + query.type + '/' + this.dateService.formatDate(query.date);
    return this
      .http
      .get<SlotModel[]>(this.apiUrlFormUri(uri));
  }

  // Planning
  findCurrentMonitorSlots(date: Date): Observable<SlotModel[]> {
    const uri = '/monitor/slots/' + this.dateService.formatDate(date);
    return this
      .http
      .get<SlotModel[]>(this.apiUrlFormUri(uri));
  }

  getSlot(id: number) {
    return this
      .http
      .get<SlotDetailModel>(this.apiUrlFormUri('/public/slots/' + id));
  }

  getSlotProposedForLocation(location: string) {
    return this
      .http
      .get<SlotProposedModel[]>(this.apiUrlFormUri('/public/slots/proposed/' + location));
  }

  removeSlots(slotIds: number[]) {
    return this
      .http
      .delete<SlotDetailModel>(
        this.apiUrlFormUri('/slots'), {body: {slots: slotIds}});
  }

  removeSlotsPeriod(start: Date, end: Date) {
    const uri = '/slots/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .delete<SlotDetailModel>(this.apiUrlFormUri(uri));
  }

  getSlotsInPeriod(start: Date, end: Date) {
    const uri = '/slots/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .get<SlotDetailModel[]>(this.apiUrlFormUri(uri));
  }

  addSlotsForPeriod(
    slots: Array<SlotPreview>,
    start: Date,
    end: Date,
    allowOverwrite: boolean,
    wipePeriod: boolean
  ) {
    const uri = '/slots/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .put<SlotModel[]>(
        this.apiUrlFormUri(uri),
        {
          overwrite: allowOverwrite,
          wipe: wipePeriod,
          slots: slots.map(slot => {
            return {
              price: slot.price,
              activityType: slot.activityType.identifier,
              startAt: slot.startAt,
              endAt: slot.endAt,
              averageActivityDuration: slot.averageActivityDuration,
            };
          })
        }
      );
  }

  checkBookingForPeriod(start: Date, end: Date) {
    const uri = '/booking/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .get<BookingModel[]>(this.apiUrlFormUri(uri));
  }

  // Chat
  getConversations() {
    return this
      .http
      .get<ConversationModel[]>(this.apiUrlFormUri('/conversations'));
  }

  getMessages(uuid: string) {
    return this
      .http
      .get<ConversationMessageModel[]>(this.apiUrlFormUri('/conversations/' + uuid));
  }

  sendMessage(id: string, message: string) {
    return this
      .http
      .post<ConversationMessageModel>(this.apiUrlFormUri('/conversations/' + id), {content: message});
  }

  getFlyLocations(): Observable<LocationModel[]> {
    return this
      .http
      .get<LocationModel[]>(this.apiUrlFormUri('/public/locations'))
      .pipe(
        map((locations: LocationModel[]) => {
          return locations.map(location => {
            return new LocationModel(
              location.uuid,
              location.identifier,
              location.name,
              location.meetingPoint,
              location.takeOffPoint,
              location.landingPoint,
            )
          })
        })
      );
  }

  getFlyType(location: string) {
    return this
      .http
      .get<TypeModel[]>(this.apiUrlFormUri('/public/locations/' + location + '/types'))
      .pipe(
        map(types => {
          return types.map(type => {
            return new TypeModel(
              type.uuid,
              type.identifier,
              type.name,
            )
          })
        })
      );
  }
}
