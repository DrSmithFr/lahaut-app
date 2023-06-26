import {ActivityTypeModel} from "./ActivityTypeModel";
import {ActivityLocationModel} from "./ActivityLocationModel";

export class SlotProposedModel {
  constructor(
    public id: number,
    public activityLocation: ActivityLocationModel,
    public activityType: ActivityTypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
  ) {}
}
