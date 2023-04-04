import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchQuery} from "../../models/search-query";
import {ApiService} from "../../../../services/api.service";
import {SlotsModel} from "../../../../models/fly/slots.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DateService} from "../../../../services/date.service";
import {Search} from "../../models/search";
import {SearchResult} from "../../models/search-result";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  searched = false;
  loading = false;

  lastQuery: SearchQuery;
  search: Search;

  constructor(
    private api: ApiService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const location: string = params["from"];
      const type: string = params["type"];
      const date: Date = params["date"];
      const person: number = params["for"];

      if (location || type || date !== undefined || person) {
        this.lastQuery = new SearchQuery(
          params["from"],
          params["type"],
          new Date(params["date"]),
          params["for"],
        );

        this.requestResults(this.lastQuery);
      }
    }).unsubscribe()
  }

  updateSearchUrl(query: SearchQuery) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        "from": query.location,
        "type": query.type,
        "date": this.dateService.formatDate(query.date),
        "for": query.person,
      },
      queryParamsHandling: "merge",
    });
  }

  requestResults(query: SearchQuery) {
    this.loading = true;

    this.updateSearchUrl(query);
    this
      .api
      .findSlots(query)
      .subscribe(
        (slots) => {
          this.searched = true;
          this.loading = false;

          const results = this.transformSlotToSearchResult(query, slots);
          this.search = new Search(query, results);

          setTimeout(() => {
            this.scrollToResults();
          }, 100);
        });
  }

  private transformSlotToSearchResult(query: SearchQuery, slots: SlotsModel[]): Map<string, SearchResult> {
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

  public scrollToResults() {
    this
      .container
      .nativeElement
      .scrollIntoView({behavior: 'smooth'});
  }
}
