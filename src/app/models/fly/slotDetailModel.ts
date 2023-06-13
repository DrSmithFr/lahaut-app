import {MonitorModel} from "../monitor.model";
import {FlyTypeModel} from "./FlyTypeModel";
import {FlyLocationModel} from "./FlyLocationModel";

export class SlotDetailModel {
  constructor(
    public id: number,

    public price: number,
    public monitor: MonitorModel,
    public flyLocation: FlyLocationModel,
    public flyType: FlyTypeModel,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
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
