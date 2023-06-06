import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";
import {ShoppingService} from "../../../../services/shopping.service";
import {CartItemModel, CartModel} from "../../../../models/cart.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: CartModel|null;

  constructor(
    private navigationService: NavigationService,
    private shoppingService: ShoppingService,
    private router: Router,
    private auth: AuthService
  ) {
    this.cart = this.shoppingService.getCart();
  }

  ngOnInit() {
    this.navigationService.setPreviousButtonVisibility(true);
    this.navigationService.setShoppingCartVisibility(false);
  }

  ngOnDestroy() {
    this.navigationService.setPreviousButtonVisibility(false);
    this.navigationService.setShoppingCartVisibility(true);
  }

  removeItem(item: CartItemModel) {
    this.shoppingService.removeItem(item);
  }

  getTotal() {
    return this.cart ? this.cart.items.reduce((acc, item) => acc + item.slot.price, 0) : 0;
  }

  checkout() {
    this.router.navigate(['/shopping/payment']);
  }
}
