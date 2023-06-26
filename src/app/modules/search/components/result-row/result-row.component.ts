import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SearchResult} from "../../models/search-result";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss'],
  animations: [
    trigger('flyIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
    ])
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
    }, 150);
  }

  openAddToCart(key: number) {
    this.addToCart.emit(key);
  }
}
