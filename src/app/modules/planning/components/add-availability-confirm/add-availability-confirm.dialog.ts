import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {flyTypePriced} from "../../models/fly-type-priced";
import {SlotPreview} from "../../models/slot-preview";
import {tap} from "rxjs/operators";
import {SlotProposedModel} from "../../../../models/fly/slotProposedModel";

export class AddAvailabilityConfirmData {
  constructor(
    public location: string,
    public start: Date,
    public end: Date,
    public flyTypes: Array<flyTypePriced>,
  ) {
  }
}

type PriceMap = Map<string, number>;
type ProposedPlanning = Map<string, Array<SlotPreview>>;

@Component({
  selector: 'app-add-availability-confirm',
  templateUrl: './add-availability-confirm.dialog.html',
  styleUrls: ['./add-availability-confirm.dialog.scss']
})
export class AddAvailabilityConfirmDialog implements OnInit {

  requesting = true;
  loading = false;
  planning: ProposedPlanning;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddAvailabilityConfirmData,
    public dialogRef: MatDialogRef<AddAvailabilityConfirmDialog>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this
      .apiService
      .getSlotProposedForLocation(this.data.location)
      .pipe(
        tap(() => {
          this.requesting = false
        }),
      )
      .subscribe({
        next: (allProposedSlots) => {
          const activeTypes = this.data.flyTypes.map((flyType) => {
            return flyType.type;
          });

          const proposedSlots = allProposedSlots.filter((slot) => {
            return activeTypes.includes(slot.type);
          });

          const priceMap = this.getPriceMap();
          const previewSlots = this.transformSlotProposedToPreview(proposedSlots, priceMap);

          this.planning = this.transformSlotProposedToPlanning(previewSlots);
        },
        error: (error) => {

        }
      });
  }

  // Planning generation
  private getPriceMap(): PriceMap {
    const priceMap = new Map<string, number>();

    for (const flyType of this.data.flyTypes) {
      priceMap.set(flyType.type, flyType.price ?? 0);
    }

    return priceMap;
  }

  private transformSlotProposedToPreview(proposedSlots: SlotProposedModel[], prices: PriceMap): SlotPreview[] {
    const previewSlots: SlotPreview[] = [];

    for (const slot of proposedSlots) {
      previewSlots.push(
        new SlotPreview(
          prices.get(slot.type) ?? 0,
          slot.flyLocation.uuid,
          slot.startAt,
          slot.endAt,
          slot.averageFlyDuration,
          slot.type,
        )
      );
    }

    return previewSlots;
  }

  transformSlotProposedToPlanning(slots: SlotPreview[]): Map<string, SlotPreview[]> {
    const result = new Map<string, SlotPreview[]>();

    for (const slot of slots) {
      const key = `${slot.startAt}`;

      if (!result.has(key)) {
        const list = new Array<SlotPreview>;
        list.push(slot);
        result.set(key, list);
      } else {
        const list = result.get(key);

        if (!list) {
          throw new Error('result is null');
        }

        list.push(slot);
      }
    }

    return result;
  }

  // Date formatting
  periodInSameYear() {
    return this.data.start.getFullYear() === this.data.end.getFullYear();
  }

  periodInSameMonth() {
    return this.data.start.getMonth() === this.data.end.getMonth();
  }

  // Modal actions
  closeModal() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close(true);
    }, 2000);
  }
}
