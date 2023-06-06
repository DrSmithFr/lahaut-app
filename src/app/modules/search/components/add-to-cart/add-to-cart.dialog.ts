import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {SlotDetailModel} from "../../../../models/fly/slotDetailModel";
import {FlyMeetingMapComponent} from "../fly-meeting-map/fly-meeting-map.component";
import {tap} from "rxjs/operators";
import {ShoppingService} from "../../../../services/shopping.service";

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart.dialog.html',
  styleUrls: ['./add-to-cart.dialog.scss']
})
export class AddToCartDialog implements OnInit {
  loading = true;
  slot: SlotDetailModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<AddToCartDialog>,
    private api: ApiService,
    public dialog: MatDialog,
    private shoppingService: ShoppingService,
  ) {
  }

  ngOnInit() {
    this
      .api
      .getSlot(this.data)
      .pipe(
        tap(() => {
          this.loading = false
        })
      )
      .subscribe(slot => {
        this.slot = slot;
      });
  }

  openMeetingPointDialog() {
    this
      .dialog
      .open(FlyMeetingMapComponent, {
        width: '600px',
        data: this.slot,
      });
  }

  addToCart() {
    this.shoppingService.addToCart(this.slot);
    this.dialogRef.close(true);
  }
}
