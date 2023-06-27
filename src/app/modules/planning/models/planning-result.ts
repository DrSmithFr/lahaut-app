import {SlotModel} from "../../api/models/activity/slot.model";
import {BookingModel} from "../../api/models/activity/booking.model";

export class PlanningResult {
  constructor(
    public startAt: string,
    public endAt: string,
    public slots: Map<number, SlotModel>,
    public bookings: Map<number, BookingModel>,
  ) {
  }
}
