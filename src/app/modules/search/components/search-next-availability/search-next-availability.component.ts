import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SearchQuery} from "../../models/search-query";
import {Search} from "../../models/search";
import {ApiService} from "../../../api/services/api.service";
import {SearchService} from "../../services/search.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-search-next-availability',
  templateUrl: './search-next-availability.component.html',
  styleUrls: ['./search-next-availability.component.scss']
})
export class SearchNextAvailabilityComponent implements OnInit {
  @Input() query: SearchQuery;
  @ViewChild('container') container: ElementRef;
  searching = true;
  result: Search | null = null;

  constructor(
    private api: ApiService,
    private searchService: SearchService,
  ) {
  }

  ngOnInit(): void {
    this.searching = true;

    this.searchNextTwoWeek(this.query).then(search => {
      this.result = search;
      this.searching = false;

      if (search !== null) {
        this.scrollToResults();
      }
    });
  }

  async searchNextTwoWeek(query: SearchQuery): Promise<Search | null> {
    for (let day = 1; day <= 15; day++) {
      const search = await this.searchNextDay(query, day);
      if (search.results.size > 0) {
        return search;
      }
    }

    return null;
  }

  async searchNextDay(query: SearchQuery, day: number): Promise<Search> {
    if (day <= 0) {
      throw new Error("Day must be greater than 0");
    }

    const date = new Date(query.date);
    date.setDate(date.getDate() + day);

    const newQuery = new SearchQuery(
      query.location,
      query.type,
      date,
      query.person,
    );

    const slots = await firstValueFrom(this.api.activities().slots().findSlots(newQuery));
    const results = this.searchService.transformSlotToSearchResult(newQuery, slots);

    return new Search(newQuery, results);
  }

  public scrollToResults() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 300);
  }
}
