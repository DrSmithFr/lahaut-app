import {ActivityTypeModel} from "../../api/models/ActivityTypeModel";

export class SlotPreview {
  constructor(
    public price: number,
    public activityType: ActivityTypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
    public selected: boolean = true,
  ) {}
}
