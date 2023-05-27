import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PlanningResult} from "../../models/planning-result";
import {BookingModel} from "../../../../models/fly/bookingModel";

@Component({
  selector: 'app-planning-row',
  templateUrl: './planning-row.component.html',
  styleUrls: ['./planning-row.component.scss']
})
export class PlanningRowComponent implements OnInit {
  @Input() result: PlanningResult;
  @ViewChild('container') container: ElementRef;

  public error = false;
  public booking: BookingModel|undefined = undefined;

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
}
