import {PlaceModel} from "./place/place.model";

export class LocationModel {
  constructor(
    public uuid: string,
    public identifier: string,
    public name: string,
    public meetingPoint: PlaceModel,
    public takeOffPoint: PlaceModel,
    public landingPoint: PlaceModel,
  ) {}
}
