import {SlotDetailModel} from "../modules/api/models/slotDetailModel";

export class CartModel {
  items: Array<CartItemModel>;

  constructor() {
    this.items = [];
  }

  static addItems(cart: CartModel, item: CartItemModel): boolean {
    if (CartModel.IsItemInCart(cart, item)) {
      return false;
    }

    cart.items.push(item);
    return true;
  }

  static removeItem(cart: CartModel, item: CartItemModel) {
    cart.items = cart.items.filter(i => i.slot.id !== item.slot.id);
  }

  static IsItemInCart(cart: CartModel, item: CartItemModel): boolean {
    return cart.items.some(i => i.slot.id === item.slot.id);
  }

  static isEmpty(cart: CartModel): boolean {
    return cart.items.length === 0;
  }
}

export class CartItemModel {
  slot: SlotDetailModel;
  lockedAt: Date|null;

  constructor(slot: SlotDetailModel) {
    this.slot = slot;
    this.lockedAt = null;
  }
}
