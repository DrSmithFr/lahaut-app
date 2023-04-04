import {MonitorModel} from "../../../models/monitor.model";

export class SearchResult {
  constructor(
    public monitors: MonitorModel[],
    public flyLocation: string,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
  ) {}
}
