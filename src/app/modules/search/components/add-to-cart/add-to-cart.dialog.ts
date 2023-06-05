import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {SlotDetailModel} from "../../../../models/fly/slotDetailModel";

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart.dialog.html',
  styleUrls: ['./add-to-cart.dialog.scss']
})
export class AddToCartDialog implements OnInit {
  slot: SlotDetailModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private api: ApiService,
  ) {
  }

  ngOnInit() {
    this.api.getSlot(this.data).subscribe(slot => {
      this.slot = slot;
    });
  }
}
