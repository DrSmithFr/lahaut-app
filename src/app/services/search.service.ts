import { Injectable } from '@angular/core';
import {SearchQuery} from "../modules/search/models/search-query";
import {SlotsModel} from "../models/fly/slots.model";
import {SearchResult} from "../modules/search/models/search-result";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public transformSlotToSearchResult(query: SearchQuery, slots: SlotsModel[]): Map<string, SearchResult> {
    const results = new Map<string, SearchResult>();

    for (const slot of slots) {
      const key = this.getSlotUniqIdentifier(slot);

      if (!results.has(key)) {
        const slotResult = new SearchResult(
          [slot.monitor],
          slot.flyLocation.uuid,
          slot.startAt,
          slot.endAt,
          slot.averageFlyDuration,
          slot.type,
        );

        results.set(key, slotResult);
      } else {
        const slotResult = results.get(key);

        if (!slotResult) {
          throw new Error('result is null');
        }

        slotResult.monitors.push(slot.monitor);
      }
    }

    for (const key of results.keys()) {
      const result = results.get(key);

      if (!result) {
        throw new Error('result is null');
      }

      if (result.monitors.length < query.person) {
        results.delete(key);
      }
    }

    return results;
  }

  public getSlotUniqIdentifier(slot: SlotsModel): string {
    return `${slot.flyLocation.uuid}-${slot.startAt}-${slot.endAt}-${slot.averageFlyDuration}-${slot.type}`;
  }
}
