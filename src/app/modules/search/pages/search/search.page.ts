import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchQuery} from "../../models/search-query";
import {ApiService} from "../../../api/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateService} from "../../../api/services/utils/date.service";
import {Search} from "../../models/search";
import {SearchService} from "../../services/search.service";
import {NavigationService} from "../../../../services/navigation.service";
import {environment} from "../../../../../environments/environment";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit, OnDestroy {
  @ViewChild('container') container: ElementRef;

  logoUrl = environment.logo;

  searched = false;
  loading = false;

  urlParamQuery: SearchQuery;
  currentQuery: SearchQuery;
  search: Search;

  isDarkMode = false;

  constructor(
    private api: ApiService,
    private searchService: SearchService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.navigationService.setLogoVisibility(false);

    this
      .themeService
      .getDarkModeSubject()
      .subscribe((isDark) => {
        this.isDarkMode = isDark;
      });

    this
      .route
      .queryParams
      .subscribe(params => {
        const location: string = params["from"];
        const type: string = params["type"];
        const date: Date = params["date"];
        const person: number = params["for"];

        if (location || type || date !== undefined || person) {
          this.urlParamQuery = new SearchQuery(
            params["from"],
            params["type"],
            new Date(params["date"]),
            params["for"],
          );
        }
      }).unsubscribe()
  }

  ngOnDestroy() {
    this.navigationService.setLogoVisibility(true);
  }

  updateUrl(query: SearchQuery) {
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

    this.currentQuery = query;
    this.updateUrl(query);

    this
      .api
      .findSlots(query)
      .subscribe(
        (slots) => {
          const results = this.searchService.transformSlotToSearchResult(query, slots);
          console.debug("search result: ", results)

          this.search = new Search(query, results);
          this.searched = true;

          this.loading = false;
          this.scrollToResults();
        });
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
