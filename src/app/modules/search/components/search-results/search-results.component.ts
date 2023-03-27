import {Component, Input} from '@angular/core';
import {SlotsModel} from "../../../../models/fly/slots.model";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  results: Map<string, SlotsModel[]> = new Map<string, SlotsModel[]>();

  @Input() set searchResults(slots: SlotsModel[]) {
    this.results = this.transformSlotToSearchResult(slots);
  }

  private transformSlotToSearchResult(slots: SlotsModel[]): Map<string, SlotsModel[]> {
    const group = new Map<string, SlotsModel[]>();

    for (const slot of slots) {
      const key = slot.startAt + slot.endAt;

      if (!group.has(key) || group.get(key) === undefined) {
        group.set(key, [slot]);
      } else {
        group.get(key)?.push(slot);
      }
    }

    return group;
  }
}
