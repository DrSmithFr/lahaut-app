import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchMonitorPriceResult} from "../../models/search-monitor-price-result";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {

  @Input() public monitors: Map<number, SearchMonitorPriceResult>;
  @Output() addToCart = new EventEmitter<number>();

  openAddToCart(key: number) {
    this.addToCart.emit(key);
  }
}
