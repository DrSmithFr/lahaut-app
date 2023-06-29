import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../api/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {flyTypePriced} from "../../models/fly-type-priced";
import {SlotPreview} from "../../models/slot-preview";
import {tap} from "rxjs/operators";
import {SlotProposedModel} from "../../../api/models/activity/slot-proposed.model";
import {HttpErrorResponse} from "@angular/common/http";
import {concat} from "rxjs";
import {UnsubscribeOnDestroyComponent} from "../../../shared/components/unsubscribe-on-destroy.component";

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
export class AddAvailabilityConfirmDialog extends UnsubscribeOnDestroyComponent implements OnInit {

  requesting = true;
  loading = false;

  planning: ProposedPlanning;

  slotsInPeriod = true;
  allowOverwrite = false;
  wipePeriod = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddAvailabilityConfirmData,
    public dialogRef: MatDialogRef<AddAvailabilityConfirmDialog>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.unsubscribeOnDestroy(
      concat(
        this.loadSlotsInPeriod(),
        this.loadProposedSlots(),
      ).subscribe(() => {
        this.requesting = false;
      })
    )
  }

  private loadSlotsInPeriod() {
    return this
      .apiService
      .activities()
      .slots()
      .getSlotsInPeriod(this.data.start, this.data.end)
      .pipe(
        tap(slots => {
          this.slotsInPeriod = slots.length > 0;
        }),
      )
  }

  private loadProposedSlots() {
    return this
      .apiService
      .activities()
      .slots()
      .getSlotProposedForLocation(this.data.location)
      .pipe(
        tap(proposedSlots => {
          const activeTypes = this.data.flyTypes.map((flyType) => {
            return flyType.type;
          });

          const activeProposedSlots = proposedSlots.filter((slot) => {
            return activeTypes.includes(slot.activityType.identifier);
          });

          const priceMap = this.getPriceMap();
          const previewSlots = this.transformSlotProposedToPreview(activeProposedSlots, priceMap);

          this.planning = this.transformSlotProposedToPlanning(previewSlots);
        }),
      )
  }

  // Planning generation
  private getPriceMap(): PriceMap {
    const priceMap = new Map<string, number>();

    for (const activityType of this.data.flyTypes) {
      priceMap.set(activityType.type, activityType.price ?? 0);
    }

    return priceMap;
  }

  private transformSlotProposedToPreview(proposedSlots: SlotProposedModel[], prices: PriceMap): SlotPreview[] {
    const previewSlots: SlotPreview[] = [];

    for (const slot of proposedSlots) {
      previewSlots.push(
        new SlotPreview(
          prices.get(slot.activityType.identifier) ?? 0,
          slot.activityType,
          slot.startAt,
          slot.endAt,
          slot.averageActivityDuration,
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

  // Checkbox management
  isAllSelected(slots: Array<SlotPreview>): boolean {
    for (const slot of slots) {
      if (!slot.selected) {
        return false;
      }
    }

    return true;
  }

  isSomeSelected(slots: Array<SlotPreview>): boolean {
    if (this.isAllSelected(slots)) {
      return false;
    }

    return slots.some((slot) => slot.selected);
  }

  selectAll(selected:boolean, slots: Array<SlotPreview>) {
    for (const slot of slots) {
      slot.selected = selected;
    }
  }

  getSelectedSlots(): Array<SlotPreview> {
    const result = new Array<SlotPreview>();

    for (const slots of this.planning.values()) {
      for (const slot of slots) {
        if (slot.selected) {
          result.push(slot);
        }
      }
    }

    return result;
  }

  hasSelectedSlots() {
    if (this.planning === undefined) {
      return false;
    }

    const slots = this.getSelectedSlots();

    return slots.length > 0;
  }

  isReadyToSubmit() {
    if (this.slotsInPeriod) {
      return this.allowOverwrite || this.wipePeriod;
    }

    return true;
  }

  // Modal actions
  closeModal() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.loading = true;

    const slots = this.getSelectedSlots();

    const s  = this
      .apiService
      .activities()
      .slots()
      .addSlotsForPeriod(
        slots,
        this.data.start,
        this.data.end,
        this.allowOverwrite,
        this.wipePeriod,
      )
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          this
            .snackBar
            .open(
              `[${err.status}] Une erreur est survenue lors de l'ajout des créneaux. Veuillez réessayer plus tard.`,
              'Fermer',
              {duration: 5000}
            );
        }
      });

    this.unsubscribeOnDestroy(s);

    setTimeout(() => {
      this.loading = false;

    }, 2000);
  }
}
