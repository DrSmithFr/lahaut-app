import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SearchResult} from "../../models/search-result";

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss']
})
export class ResultRowComponent {
  @Input() slot: SearchResult;
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
