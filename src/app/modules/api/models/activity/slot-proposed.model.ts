import {TypeModel} from "./type-model";
import {LocationModel} from "./location.model";

export class SlotProposedModel {
  constructor(
    public id: number,
    public activityLocation: LocationModel,
    public activityType: TypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
  ) {}
}
