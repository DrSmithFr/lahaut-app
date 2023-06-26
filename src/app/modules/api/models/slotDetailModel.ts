import {MonitorModel} from "./monitor.model";
import {ActivityTypeModel} from "./ActivityTypeModel";
import {ActivityLocationModel} from "./ActivityLocationModel";

export class SlotDetailModel {
  constructor(
    public id: number,

    public price: number,
    public monitor: MonitorModel,
    public activityLocation: ActivityLocationModel,
    public activityType: ActivityTypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
  ) {}
}
export class PlaceModel {
  constructor(
    public name: string,
    public description: string,
    public latitude: number,
    public longitude: number,
    public address: AddressModel,
  ) {}
}

export class AddressModel {
  constructor(
    public street: string,
    public city: string,
    public country: string,
    public zipCode: string,
  ) {}
}
