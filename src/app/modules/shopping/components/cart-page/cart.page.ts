import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";
import {ShoppingService} from "../../../../services/shopping.service";
import {CartItemModel, CartModel} from "../../../../models/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit, OnDestroy {

  cart: CartModel | null = null;

  constructor(
    private navigationService: NavigationService,
    private shoppingService: ShoppingService,
    private router: Router,
  ) {
    this
      .shoppingService
      .getCartSubject()
      .subscribe((cart: CartModel | null) => {
        this.cart = cart;

        if (cart?.items.length === 0) {
          this.shoppingService.saveCart(null);
          this.router.navigate(['/']);
        }
      });
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
