import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {SlotDetailModel} from "../../../../models/fly/slotDetailModel";
import {FlyMapComponent} from "../fly-map/fly-map.component";
import {FlyMeetingMapComponent} from "../fly-meeting-map/fly-meeting-map.component";
import {tap} from "rxjs/operators";
import {DateService} from "../../../../services/date.service";

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
    private api: ApiService,
    private dateService: DateService,
    public dialog: MatDialog
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

  openFlyMapDialog() {
    this
      .dialog
      .open(FlyMapComponent, {
        width: '600px',
        data: this.slot,
      });
  }
}
