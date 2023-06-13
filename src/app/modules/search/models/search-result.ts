import {SearchMonitorPriceResult} from "./search-monitor-price-result";

export class SearchResult {
  constructor(
    public monitors: Map<number, SearchMonitorPriceResult>,
    public flyLocation: string,
    public flyType: string,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
  ) {
  }
}
