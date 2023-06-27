import {MonitorModel} from "../user.model";
import {BookingModel} from "./booking.model";
import {TypeModel} from "./type-model";
import {LocationModel} from "./location.model";

export class SlotModel {
  constructor(
    public id: number,
    public price: number,
    public monitor: MonitorModel,
    public activityType: TypeModel,
    public activityLocation: LocationModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
    public type: string,
    public booking: null|BookingModel
  ) {}
}
