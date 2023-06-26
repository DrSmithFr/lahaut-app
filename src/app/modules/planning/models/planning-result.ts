import {SlotModel} from "../../api/models/slotModel";
import {BookingModel} from "../../api/models/bookingModel";

export class PlanningResult {
  constructor(
    public startAt: string,
    public endAt: string,
    public slots: Map<number, SlotModel>,
    public bookings: Map<number, BookingModel>,
  ) {
  }
}
