import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SlotModel} from "../../../api/models/slotModel";
import {CallService} from "../../../api/services/call.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-remove-hour-availability',
  templateUrl: './remove-hour-availability.dialog.html',
  styleUrls: ['./remove-hour-availability.dialog.scss']
})
export class RemoveHourAvailabilityDialog implements OnInit {
  slots: Map<number, SlotModel>;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Map<number, SlotModel>,
    public dialogRef: MatDialogRef<RemoveHourAvailabilityDialog>,
    private apiService: CallService,
    private snackBar: MatSnackBar,
  ) {
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

    this
      .apiService
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
  }
}
