import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  loading = true;

  constructor(
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.navigationService.setPreviousButtonVisibility(true);
    this.navigationService.setShoppingCartVisibility(false);

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.navigationService.setPreviousButtonVisibility(false);
    this.navigationService.setShoppingCartVisibility(true);
  }

}
