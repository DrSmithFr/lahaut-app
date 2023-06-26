import {Injectable} from '@angular/core';
import {SlotModel} from "../../api/models/slotModel";
import {PlanningResult} from "../models/planning-result";
import {BookingModel} from "../../api/models/bookingModel";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddAvailabilityDialog} from "../modals/add-availability/add-availability.dialog";
import {
  RemovePeriodAvailabilityDialog
} from "../modals/remove-period-availability/remove-period-availability.dialog";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  constructor(
    public dialog: MatDialog,
  ) {
  }

  public transformSlotToPlanningResult(slots: SlotModel[]): Map<string, PlanningResult> {
    const results = new Map<string, PlanningResult>();

    for (const slot of slots) {
      const key = `${slot.startAt}`;

      if (!results.has(key)) {
        const planningResult = new PlanningResult(
          slot.startAt,
          slot.endAt,
          new Map<number, SlotModel>(),
          new Map<number, BookingModel>(),
        );

        if (slot.booking !== null) {
          planningResult.bookings.set(slot.booking.id, slot.booking);
        } else {
          planningResult.slots.set(slot.id, slot);
        }

        results.set(key, planningResult);
      } else {
        const planningResult = results.get(key);

        if (!planningResult) {
          throw new Error('result is null');
        }

        if (slot.booking !== null) {
          planningResult.bookings.set(slot.booking.id, slot.booking);
        } else {
          planningResult.slots.set(slot.id, slot);
        }
      }
    }

    return results;
  }

  openAddAvailabilityDialog(dialog: MatDialog): MatDialogRef<AddAvailabilityDialog> {
    return dialog.open(
      AddAvailabilityDialog,
      {
        width: '600px',
      }
    )
  }

  openRemoveAvailabilityDialog(dialog: MatDialog): MatDialogRef<RemovePeriodAvailabilityDialog> {
    return dialog.open(
      RemovePeriodAvailabilityDialog,
      {
        width: '600px',
      }
    )
  }
}
