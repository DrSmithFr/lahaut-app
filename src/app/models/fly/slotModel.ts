import {MonitorModel} from "../monitor.model";

export class SlotModel {
  constructor(
    public id: number,
    public price: number,
    public monitor: MonitorModel,
    public flyLocation: {
      uuid: string,
    },
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
  ) {}
}
