import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";
import {ShoppingService} from "../../services/shopping.service";
import {CartItemModel, CartModel} from "../../models/cart.model";
import {Router} from "@angular/router";
import {UnsubscribeOnDestroyComponent} from "../../../_shared/components/unsubscribe-on-destroy.component";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage extends UnsubscribeOnDestroyComponent implements OnInit, OnDestroy {

  cart: CartModel | null = null;

  constructor(
    private navigationService: NavigationService,
    private shoppingService: ShoppingService,
    private router: Router,
  ) {
    super();

    const s = this
      .shoppingService
      .getCartSubject()
      .subscribe((cart: CartModel | null) => {
        this.cart = cart;

        if (cart?.items.length === 0) {
          this.shoppingService.saveCart(null);
          this.router.navigate(['/']);
        }
      });

    this.unsubscribeOnDestroy(s);
  }

  ngOnInit() {
    this.navigationService.setShoppingCartVisibility(false);
  }

  override ngOnDestroy() {
    this.navigationService.setShoppingCartVisibility(true);
    super.ngOnDestroy();
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
