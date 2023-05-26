import {MonitorModel} from "../monitor.model";

export class SlotDetailModel {
  constructor(
    public id: number,

    public price: number,
    public monitor: MonitorModel,
    public flyLocation: {
      meetingPoint: PlaceModel,
      takeOffPoint: PlaceModel,
      landingPoint: PlaceModel,
    },
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
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
