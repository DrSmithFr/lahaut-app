import {MonitorModel} from "./monitor.model";
import {BookingModel} from "./bookingModel";
import {ActivityTypeModel} from "./ActivityTypeModel";
import {ActivityLocationModel} from "./ActivityLocationModel";

export class SlotModel {
  constructor(
    public id: number,
    public price: number,
    public monitor: MonitorModel,
    public activityType: ActivityTypeModel,
    public activityLocation: ActivityLocationModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
    public type: string,
    public booking: null|BookingModel
  ) {}
}
