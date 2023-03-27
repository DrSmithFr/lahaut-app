import {Component} from '@angular/core';
import {SearchQuery} from "../../models/search-query";
import {ApiService} from "../../../../services/api.service";
import {SlotsModel} from "../../../../models/fly/slots.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  loading = false;
  results: SlotsModel[] = [];

  constructor(
    private api: ApiService,
  ) {
  }

  requestResults(query: SearchQuery) {
    this.loading = true;

    this
      .api
      .findSlots(query)
      .subscribe(
        (slots) => {
          this.loading = false;
          this.results = slots;
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }
}
