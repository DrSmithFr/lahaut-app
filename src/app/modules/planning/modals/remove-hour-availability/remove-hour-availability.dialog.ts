import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SlotModel} from "../../../api/models/activity/slot.model";
import {ApiService} from "../../../api/services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UnsubscribeOnDestroyComponent} from "../../../shared/components/unsubscribe-on-destroy.component";

@Component({
  selector: 'app-remove-hour-availability',
  templateUrl: './remove-hour-availability.dialog.html',
  styleUrls: ['./remove-hour-availability.dialog.scss']
})
export class RemoveHourAvailabilityDialog extends UnsubscribeOnDestroyComponent implements OnInit {
  slots: Map<number, SlotModel>;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Map<number, SlotModel>,
    public dialogRef: MatDialogRef<RemoveHourAvailabilityDialog>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    this.slots = this.data;
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.loading = true;

    const slotIds = Array
      .from(this.slots.values())
      .map(slot => slot.id);

    const s = this
      .apiService
      .activities()
      .slots()
      .removeSlots(slotIds)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;

          this
            .snackBar
            .open(
               `[${error.status}] Une erreur est survenue lors de la suppression des créneaux.`,
              'Close',
              {duration: 5000}
            );
        }
      })

    this.unsubscribeOnDestroy(s);
  }
}
