import {FlyTypeModel} from "../../../models/fly/FlyTypeModel";

export class SlotPreview {
  constructor(
    public price: number,
    public flyType: FlyTypeModel,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public selected: boolean = true,
  ) {}
}
