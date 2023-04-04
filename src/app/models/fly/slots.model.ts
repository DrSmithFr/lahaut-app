import {MonitorModel} from "../monitor.model";

export class SlotsModel {
  constructor(
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
