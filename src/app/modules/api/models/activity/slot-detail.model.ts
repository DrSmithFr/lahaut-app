import {MonitorModel} from "../user.model";
import {TypeModel} from "./type-model";
import {LocationModel} from "./location.model";

export class SlotDetailModel {
  constructor(
    public id: number,

    public price: number,
    public monitor: MonitorModel,
    public activityLocation: LocationModel,
    public activityType: TypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
  ) {}
}
