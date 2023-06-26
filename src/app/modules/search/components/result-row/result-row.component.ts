import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SearchResult} from "../../models/search-result";
import {activityInList} from "../../../../animations/components-animations";

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss'],
  animations: [
    activityInList.children
  ]
})
export class ResultRowComponent {
  @Input() slot: SearchResult;
  @Output() addToCart = new EventEmitter<number>();

  @ViewChild('container') container: ElementRef;

  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 200);
  }

  openAddToCart(key: number) {
    this.addToCart.emit(key);
  }
}
