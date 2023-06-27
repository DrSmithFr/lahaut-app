import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../api/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {BookingModel} from "../../../api/models/activity/booking.model";
import {BreakpointService, Devices} from "../../../../services/breakpoint.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-remove-period-availability',
  templateUrl: './remove-period-availability.dialog.html',
  styleUrls: ['./remove-period-availability.dialog.scss']
})
export class RemovePeriodAvailabilityDialog {

  periodForm = this.fb.group({
    dayOnly: [true, [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required, this.endOlderThanStart.bind(this)]],
  });

  loading = false;
  validated = false;

  bookings: BookingModel[] | null = null;
  override = false;

  // Datepicker options
  toucheUi = false;
  autoOpen = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RemovePeriodAvailabilityDialog>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private breakpointService: BreakpointService,
  ) {
    this
      .breakpointService
      .getDeviceSubject()
      .pipe(
        tap((device) => {
          this.toucheUi = device === Devices.smallMobile;
          this.autoOpen = device === Devices.smallMobile || device === Devices.largeMobile || device === Devices.tablet;
        })
      )
      .subscribe();
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  onValidated() {
    if (!this.periodForm.valid) {
      console.error('Form is not valid')
      return;
    }

    this.loading = true;

    const start = new Date(this.getStart()?.value)
    const end = new Date(this.getEnd()?.value)

    this
      .api
      .checkBookingForPeriod(start, end)
      .subscribe({
        next: (bookings) => {
          this.loading = false;
          this.validated = true;
          this.bookings = bookings;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;

          this
            .snackBar
            .open(
              `[${err.status}] Une erreur est survenue lors de la recherche de réservation sur la période.`,
              'Close',
              {duration: 5000}
            );
        }
      });
  }

  canSubmit(): boolean {
    if (this.override) {
      return true;
    }

    return this.bookings !== null && this.bookings.length === 0;
  }

  onSubmit() {
    if (!this.periodForm.valid) {
      console.error('Form is not valid')
      return;
    }

    this.loading = true;

    const start: string | null = this.periodForm.value.start ?? null;
    const end: string | null = this.periodForm.value.end ?? null;

    if (start === null || end === null) {
      console.error('Form is not valid');
      return;
    }

    this
      .apiService
      .removeSlotsPeriod(new Date(start), new Date(end))
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

  updateEndDate() {
    const dayOnly: boolean = this.periodForm.value.dayOnly ?? false;
    const start: string | null = this.periodForm.value.start ?? null;
    let end: string | null = this.periodForm.value.end ?? null;

    if (start === null || start === '') {
      return;
    }

    if (end === null || end === '' || dayOnly) {
      const newEnd = new Date(start);
      newEnd.setDate(newEnd.getDate() + 1);
      end = newEnd.toISOString();

      // update form value
      this.periodForm.setValue({dayOnly, start, end});
      this.forceFormValidation();
    }
  }

  forceFormValidation() {
    this.getEnd()?.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true,
    });

    // trigger form validation
    this.periodForm.updateValueAndValidity();
  }

  getStart(): AbstractControl | null {
    return this.periodForm.get('start');
  }

  getEnd(): AbstractControl | null {
    return this.periodForm.get('end');
  }

  /**
   * triggered when field invalid an edited
   */
  hasError(field: AbstractControl | null): boolean {
    if (field === null) {
      return false;
    }

    return (field.dirty || field.touched) && !field.valid;
  }

  endOlderThanStart(control: AbstractControl): ValidationErrors | null {
    if (control.value === '' || control.value === null) {
      return null;
    }

    const start: string | null = this.periodForm.value.start ?? null;

    if (start === null) {
      return null;
    }

    if (new Date(start) > new Date(control.value)) {
      return {
        ['invalid_period']: 'end older than start'
      };
    }

    return null;
  }
}
