import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {StateService} from './state.service';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../models/token.model';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {tap} from 'rxjs/operators';
import {MessageModel} from "../models/message.model";
import {SearchQuery} from "../modules/search/models/search-query";
import {SlotModel} from "../models/fly/slotModel";
import {DateService} from "./date.service";
import {SlotDetailModel} from "../models/fly/slotDetailModel";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiService {
  readonly API_URL = environment.url_api;

  constructor(
    protected state: StateService,
    protected http: HttpClient,
    private dateService: DateService
  ) {
  }

  apiUrlFormUri(uri: string): string {
    return this.API_URL + uri;
  }

  login(username: string, password: string): Observable<TokenModel> {
    return this
      .http
      .post<TokenModel>(
        this.apiUrlFormUri('/public/login'),
        {username, password}
      )
      .pipe(
        tap(tokens => {
          // updating session with current token
          this.state.TOKEN.next(tokens);
        })
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
      )
      .pipe(
        tap(data => {
          this.state.TOKEN.next(data);
        })
      );
  }

  getCurrentUser(): Observable<UserModel> {
    return this
      .http
      .get<UserModel>(this.apiUrlFormUri('/user/information'))
      .pipe(
        tap(user => {
          // updating session with current users information
          this.state.LOGGED_USER.next(user);
        }),
      );
  }

  findCurrentMonitorSlots(date: Date): Observable<SlotModel[]> {
    const uri = '/monitor/slots/' + this.dateService.formatDate(date);
    return this
      .http
      .get<SlotModel[]>(this.apiUrlFormUri(uri));
  }

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

  updatePassword(token: string, oldPassword: string, newPassword: string): Observable<MessageModel> {
    return this
      .http
      .patch<MessageModel>(
        this.apiUrlFormUri('/public/user/password_update'),
        {oldPassword, newPassword},
      );
  }

  checkAccountExist(email: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.apiUrlFormUri('/public/register/available'), {username: email});
  }

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

  findSlots(query: SearchQuery) {
    const uri = '/public/slots/' + query.location + '/' + query.type + '/' + this.dateService.formatDate(query.date);
    return this
      .http
      .get<SlotModel[]>(this.apiUrlFormUri(uri));
  }

  getSlot(id: number) {
    return this
      .http
      .get<SlotDetailModel>(this.apiUrlFormUri('/public/slots/' + id));
  }

  removeSlots(slotIds: number[]) {
    return this
      .http
      .delete<SlotDetailModel>(
        this.apiUrlFormUri('/slots'), {body: {slots: slotIds}});
  }
}
