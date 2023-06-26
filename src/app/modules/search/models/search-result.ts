import {SearchMonitorPriceResult} from "./search-monitor-price-result";

export class SearchResult {
  constructor(
    public monitors: Map<number, SearchMonitorPriceResult>,
    public activityLocation: string,
    public activityType: string,
    public startAt: string,
    public endAt: string,
    public averageActivityDuration: string,
    public type: string,
  ) {
  }
}
