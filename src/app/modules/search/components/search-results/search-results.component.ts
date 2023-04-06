import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Search} from "../../models/search";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input() search: Search;

  @ViewChild('container') container: ElementRef;

  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 150);
  }
}
