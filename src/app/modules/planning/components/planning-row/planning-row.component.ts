import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlanningResult} from "../../models/planning-result";
import {BookingModel} from "../../../api/models/bookingModel";
import {SlotModel} from "../../../api/models/slotModel";
import {MatDialog} from "@angular/material/dialog";
import {RemoveHourAvailabilityDialog} from "../../modals/remove-hour-availability/remove-hour-availability.dialog";
import {activityInList} from "../../../../animations/components-animations";

@Component({
  selector: 'app-planning-row',
  templateUrl: './planning-row.component.html',
  styleUrls: ['./planning-row.component.scss'],
  animations: [
    activityInList.children
  ]
})
export class PlanningRowComponent implements OnInit {
  @Input() result: PlanningResult;
  @Output() requestPlanningRefresh = new EventEmitter<boolean>();
  @ViewChild('container') container: ElementRef;

  public error = false;
  public booking: BookingModel | undefined = undefined;

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Show error if:
    // - there is a booking and slot still available at the same time
    // - there is multiple bookings at the same time
    if (this.result.bookings.size > 0 && this.result.slots.size > 0 || this.result.bookings.size > 1) {
      this.error = true;
    }

    if (this.result.bookings.size == 1 && this.result.slots.size == 0) {
      const key = this.result.bookings.keys().next();
      this.booking = this.result.bookings.get(key.value);
    }
  }

  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 200);
  }

  removeAvailability(slots: Map<number, SlotModel>) {
    this
      .dialog
      .open(
        RemoveHourAvailabilityDialog,
        {
          width: '600px',
          data: slots
        }
      )
      .afterClosed()
      .subscribe((removed: boolean) => {
        if (removed) {
          this.requestPlanningRefresh.emit(true);
        }
      });
  }
}
