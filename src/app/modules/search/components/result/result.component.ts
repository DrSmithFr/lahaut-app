import {Component, Input} from '@angular/core';
import {Search} from "../../models/search";
import {AddToCartDialog} from "../add-to-cart/add-to-cart.dialog";
import {MatDialog} from "@angular/material/dialog";
import {activityInList} from "../../../../animations/components-animations";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    activityInList.parent
  ]
})
export class ResultComponent {
  @Input() search: Search;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openAddToCart(key: number) {
    this.dialog.open(
      AddToCartDialog,
      {
        width: '600px',
        data: {
          slot: key,
          maxToCart: this.search.query.person,
        }
      }
    );
  }
}
