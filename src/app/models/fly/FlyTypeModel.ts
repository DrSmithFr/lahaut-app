import {FlyLocationModel} from "./FlyLocationModel";

export class FlyTypeModel {
  constructor(
    public uuid: string,
    public identifier: string,
    public name: string,
    public flyLocation: FlyLocationModel,
  ) {}
}
