import {SlotDetailModel} from "./fly/slotDetailModel";

export class CartModel {
  items: Array<CartItemModel>;

  constructor() {
    this.items = [];
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
