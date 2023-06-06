import {Injectable} from '@angular/core';
import {CartModel} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";
import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  SHOPPING_CART: BehaviorSubject<CartModel | null>;

  constructor(
    private localService: LocalService
  ) {
    this.SHOPPING_CART = new BehaviorSubject<CartModel | null>(
      this.localService.getObject<CartModel>('STATE_SHOPPING_CART') || null
    );

    this.SHOPPING_CART.subscribe((cart: CartModel | null) => {
      this.localService.setObject('STATE_SHOPPING_CART', cart);
    });
  }

  getCartObservable(): BehaviorSubject<CartModel | null> {
    return this.SHOPPING_CART;
  }

  getCart(): CartModel | null {
    return this.getCartObservable().getValue();
  }

  saveCart(cart: CartModel): void {
    this.getCartObservable().next(cart);
  }
}
