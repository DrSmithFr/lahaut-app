import {Component, Input} from '@angular/core';
import {Search} from "../../models/search";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input() search: Search;
}
