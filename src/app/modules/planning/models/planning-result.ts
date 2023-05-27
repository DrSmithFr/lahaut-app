import {SlotModel} from "../../../models/fly/slotModel";
import {BookingModel} from "../../../models/fly/bookingModel";

export class PlanningResult {
  constructor(
    public startAt: string,
    public endAt: string,
    public slots: Map<number, SlotModel>,
    public bookings: Map<number, BookingModel>,
  ) {
  }
}
