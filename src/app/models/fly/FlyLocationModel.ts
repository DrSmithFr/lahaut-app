import {PlaceModel} from "./slotDetailModel";

export class FlyLocationModel {
  constructor(
    public uuid: string,
    public identifier: string,
    public name: string,
    public meetingPoint: PlaceModel,
    public takeOffPoint: PlaceModel,
    public landingPoint: PlaceModel,
  ) {}
}
