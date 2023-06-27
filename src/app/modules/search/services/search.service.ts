import { Injectable } from '@angular/core';
import {SearchQuery} from "../models/search-query";
import {SlotModel} from "../../api/models/activity/slot.model";
import {SearchResult} from "../models/search-result";
import {SearchMonitorPriceResult} from "../models/search-monitor-price-result";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public transformSlotToSearchResult(query: SearchQuery, slots: SlotModel[]): Map<string, SearchResult> {
    const results = new Map<string, SearchResult>();

    for (const slot of slots) {
      const key = this.getSlotUniqIdentifier(slot);

      if (!results.has(key)) {
        const slotResult = new SearchResult(
          new Map<number, SearchMonitorPriceResult>(),
          slot.activityLocation.identifier,
          slot.activityType.identifier,
          slot.startAt,
          slot.endAt,
          slot.averageActivityDuration,
          slot.type,
        );

        slotResult.monitors.set(slot.id, new SearchMonitorPriceResult(slot.price, slot.monitor));

        results.set(key, slotResult);
      } else {
        const slotResult = results.get(key);

        if (!slotResult) {
          throw new Error('result is null');
        }

        slotResult.monitors.set(slot.id, new SearchMonitorPriceResult(slot.price, slot.monitor));
      }
    }

    for (const key of results.keys()) {
      const result = results.get(key);

      if (!result) {
        throw new Error('result is null');
      }

      if (result.monitors.size < query.person) {
        results.delete(key);
      }
    }

    return results;
  }

  public getSlotUniqIdentifier(slot: SlotModel): string {
    return `${slot.activityType.identifier}-${slot.startAt}-${slot.endAt}-${slot.averageActivityDuration}-${slot.type}`;
  }
}
