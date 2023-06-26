import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlanningResult} from "../../models/planning-result";
import {BookingModel} from "../../../../models/fly/bookingModel";
import {SlotModel} from "../../../../models/fly/slotModel";
import {MatDialog} from "@angular/material/dialog";
import {RemoveHourAvailabilityDialog} from "../remove-hour-availability/remove-hour-availability.dialog";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-planning-row',
  templateUrl: './planning-row.component.html',
  styleUrls: ['./planning-row.component.scss'],
  animations: [
    trigger('flyIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
    ])
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
    }, 150);
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
