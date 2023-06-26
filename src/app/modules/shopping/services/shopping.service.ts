import {Injectable} from '@angular/core';
import {CartItemModel, CartModel} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";
import {LocalService} from "../../api/services/local.service";
import {SlotDetailModel} from "../../api/models/slotDetailModel";

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

  getCartSubject(): BehaviorSubject<CartModel | null> {
    return this.SHOPPING_CART;
  }

  getCart(): CartModel | null {
    return this.getCartSubject().getValue();
  }

  saveCart(cart: CartModel|null): void {
    console.debug('shopping cart saved:', cart);
    this.getCartSubject().next(cart);
  }

  addToCart(slot: SlotDetailModel) {
    const cart = this.getCart() || new CartModel();
    const item = new CartItemModel(slot);

    const added = CartModel.addItems(cart, item);

    this.saveCart(cart);

    return added;
  }

  removeItem(item: CartItemModel) {
    const cart = this.getCart() || new CartModel();

    CartModel.removeItem(cart, item);

    this.saveCart(cart);
  }
}
