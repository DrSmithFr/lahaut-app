import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {flyLocation, flyType} from "../../../../../environments/fly-location";
import {flyTypePriced} from "../../models/fly-type-priced";
import {
  AddAvailabilityConfirmData,
  AddAvailabilityConfirmDialog
} from "../add-availability-confirm/add-availability-confirm.dialog";

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.dialog.html',
  styleUrls: ['./add-availability.dialog.scss']
})
export class AddAvailabilityDialog {
  @ViewChild('container') container: ElementRef;

  flyLocations = flyLocation;
  flyTypes: Array<flyTypePriced>;

  paramForm = this.fb.group({
    location: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required, this.endOlderThanStart.bind(this)]],
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAvailabilityDialog>,
    public dialog: MatDialog,
  ) {
    this.flyTypes = [];

    for (const [key, value] of flyType) {
      this.flyTypes.push({
        type: key,
        label: value,
        selected: false,
        price: null,
      });
    }
  }

  // Form fields
  getEnd(): AbstractControl | null {
    return this.paramForm.get('end');
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

    const start: string | null = this.paramForm.value.start ?? null;

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

  flyTypeValid(): boolean {
    let atLeastOneSelected = false;
    let AllValid = true;

    for (const flyType of this.flyTypes) {
      atLeastOneSelected = atLeastOneSelected || flyType.selected;

      if (flyType.selected && flyType.price === null) {
        AllValid = false;
      }
    }

    return AllValid && atLeastOneSelected;
  }

  flyTypeInvalid(): boolean {
    return !this.flyTypeValid();
  }

  // Modal actions
  closeModal() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.paramForm.valid) {
      console.error('Form is not valid')
      return;
    }

    if (!this.flyTypeValid()) {
      console.error('Fly type is not valid')
      return;
    }

    this.loading = true;

    const location: string | null = this.paramForm.value.location ?? null;
    const start: string | null = this.paramForm.value.start ?? null;
    const end: string | null = this.paramForm.value.end ?? null;
    const flyTypes = this.flyTypes.filter(flyType => flyType.selected);

    if (location === null || start === null || end === null || flyTypes.length === 0) {
      console.error('Form values not valid')
      return;
    }

    this
      .dialog
      .open(
        AddAvailabilityConfirmDialog,
        {
          width: '600px',
          data: new AddAvailabilityConfirmData(
            location,
            new Date(start),
            new Date(end),
            flyTypes,
          )
        }
      )
      .afterClosed()
      .subscribe((added: boolean) => {
        this.dialogRef.close(added);
      });
  }

  // UX actions
  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 150);
  }
}
