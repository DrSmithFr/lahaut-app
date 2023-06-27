import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchQuery} from "../../../search/models/search-query";
import {SlotModel} from "../../models/activity/slot.model";
import {DateService} from "../utils/date.service";
import {SlotDetailModel} from "../../models/activity/slot-detail.model";
import {BookingModel} from "../../models/activity/booking.model";
import {SlotProposedModel} from "../../models/activity/slot-proposed.model";
import {SlotPreview} from "../../../planning/models/slot-preview";
import {UrlService} from "../utils/url.service";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class SlotService {
  constructor(
    private http: HttpClient,
    private dateService: DateService,
    private url: UrlService,
  ) {
  }

  findSlots(query: SearchQuery) {
    const uri = '/public/slots/' + query.type + '/' + this.dateService.formatDate(query.date);
    return this
      .http
      .get<SlotModel[]>(this.url.urlFormUri(uri));
  }

  findCurrentMonitorSlots(date: Date): Observable<SlotModel[]> {
    const uri = '/monitor/slots/' + this.dateService.formatDate(date);
    return this
      .http
      .get<SlotModel[]>(this.url.urlFormUri(uri));
  }

  getSlot(id: number) {
    return this
      .http
      .get<SlotDetailModel>(this.url.urlFormUri('/public/slots/' + id));
  }

  getSlotProposedForLocation(location: string) {
    return this
      .http
      .get<SlotProposedModel[]>(this.url.urlFormUri('/public/slots/proposed/' + location));
  }

  removeSlots(slotIds: number[]) {
    return this
      .http
      .delete<SlotDetailModel>(
        this.url.urlFormUri('/slots'), {body: {slots: slotIds}});
  }

  removeSlotsPeriod(start: Date, end: Date) {
    const uri = '/slots/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .delete<SlotDetailModel>(this.url.urlFormUri(uri));
  }

  getSlotsInPeriod(start: Date, end: Date) {
    const uri = '/slots/' + this.dateService.formatDate(start) + '-' + this.dateService.formatDate(end);
    return this
      .http
      .get<SlotDetailModel[]>(this.url.urlFormUri(uri));
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
        this.url.urlFormUri(uri),
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
      .get<BookingModel[]>(this.url.urlFormUri(uri));
  }
}
