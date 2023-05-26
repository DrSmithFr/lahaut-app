import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddToCartDialog} from "../add-to-cart/add-to-cart.dialog";
import {SearchMonitorPriceResult} from "../../models/search-monitor-price-result";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {

  @Input() public monitors: Map<number, SearchMonitorPriceResult>;

  constructor(
    public dialog: MatDialog
  ) {
  }

  openAddToCart(key: number) {
    this.dialog.open(
      AddToCartDialog,
      {
        width: '600px',
        data: key
      }
    );
  }
}
