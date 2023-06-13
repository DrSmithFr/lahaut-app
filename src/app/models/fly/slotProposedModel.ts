import {FlyTypeModel} from "./FlyTypeModel";
import {FlyLocationModel} from "./FlyLocationModel";

export class SlotProposedModel {
  constructor(
    public id: number,
    public flyLocation: FlyLocationModel,
    public flyType: FlyTypeModel,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
  ) {}
}
