import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../api/services/api.service";
import {SlotDetailModel} from "../../../api/models/activity/slot-detail.model";
import {FlyMeetingMapComponent} from "../../components/fly-meeting-map/fly-meeting-map.component";
import {tap} from "rxjs/operators";
import {ShoppingService} from "../../../shopping/services/shopping.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart.dialog.html',
  styleUrls: ['./add-to-cart.dialog.scss']
})
export class AddToCartDialog implements OnInit {
  loading = true;
  slot: SlotDetailModel;

  lastToCart = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { slot: number, maxToCart: number },
    public dialogRef: MatDialogRef<AddToCartDialog>,
    private api: ApiService,
    public dialog: MatDialog,
    private shoppingService: ShoppingService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    const cart = this.shoppingService.getCart();

    this.lastToCart = (cart?.items?.length ?? 0) + 1 >= data.maxToCart;
  }

  ngOnInit() {
    this
      .api
      .getSlot(this.data.slot)
      .pipe(
        tap(slot => {
          this.loading = false
          this.slot = slot;
        })
      )
      .subscribe();
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
    const added = this.shoppingService.addToCart(this.slot);

    if (!added) {
      this.snackBar.open('Ce créneau est déjà dans votre panier', 'OK');
      this.dialogRef.close(true);
      return;
    }

    const cart = this.shoppingService.getCart();
    if ((cart?.items.length ?? 0) >= this.data.maxToCart) {
      this.router.navigate(['/shopping/cart']);
    }

    this.dialogRef.close(true);
  }
}
