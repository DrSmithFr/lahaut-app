import {PlaceModel} from "./slotDetailModel";

export class ActivityLocationModel {
  constructor(
    public uuid: string,
    public identifier: string,
    public name: string,
    public meetingPoint: PlaceModel,
    public takeOffPoint: PlaceModel,
    public landingPoint: PlaceModel,
  ) {}
}
