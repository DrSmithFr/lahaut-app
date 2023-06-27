import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationModel} from "../../models/activity/location.model";
import {TypeModel} from "../../models/activity/type-model";
import {map} from "rxjs/operators";
import {UrlService} from "../utils/url.service";
import {SlotService} from "./slot.service";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ActivityService {
  constructor(
    private http: HttpClient,
    private url: UrlService,
    private slot: SlotService,
  ) {
  }

  public slots(): SlotService {
    return this.slot;
  }

  getLocations(): Observable<LocationModel[]> {
    return this
      .http
      .get<LocationModel[]>(this.url.urlFormUri('/public/activities/locations'))
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

  getTypeByLocation(location: string) {
    return this
      .http
      .get<TypeModel[]>(this.url.urlFormUri('/public/activities/locations/' + location + '/types'))
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
