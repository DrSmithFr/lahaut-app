import {MonitorModel} from "../monitor.model";
import {BookingModel} from "./bookingModel";
import {FlyTypeModel} from "./FlyTypeModel";

export class SlotModel {
  constructor(
    public id: number,
    public price: number,
    public monitor: MonitorModel,
    public flyType: FlyTypeModel,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
    public booking: null|BookingModel
  ) {}
}
