import {TypeModel} from "../../api/models/activity/type-model";

export class SlotPreview {
  constructor(
    public price: number,
    public activityType: TypeModel,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
    public selected: boolean = true,
  ) {}
}
