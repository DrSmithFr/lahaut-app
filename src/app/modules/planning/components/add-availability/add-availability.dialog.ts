import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {flyTypePriced} from "../../models/fly-type-priced";
import {
  AddAvailabilityConfirmData,
  AddAvailabilityConfirmDialog
} from "../add-availability-confirm/add-availability-confirm.dialog";
import {ApiService} from "../../../../services/api.service";
import {tap} from "rxjs/operators";
import {FlyLocationModel} from "../../../../models/fly/FlyLocationModel";
import {BreakpointService, Devices} from "../../../../services/breakpoint.service";

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.dialog.html',
  styleUrls: ['./add-availability.dialog.scss']
})
export class AddAvailabilityDialog implements OnInit {
  @ViewChild('container') container: ElementRef;

  flyLocations: FlyLocationModel[] = [];
  flyTypes: Array<flyTypePriced> = [];

  paramForm = this.fb.group({
    location: new FormControl<string | null>(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    start: new FormControl<Date | null>(
      null,
      [Validators.required]
    ),
    end: new FormControl<Date | null>(
      null,
      [Validators.required, this.endOlderThanStart.bind(this)]
    ),
  });

  loading = false;

  // Datepicker options
  toucheUi = false;
  autoOpen = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAvailabilityDialog>,
    public dialog: MatDialog,
    public api: ApiService,
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

  ngOnInit() {
    this
      .loadFlyLocations()
      .subscribe();
  }

  loadFlyLocations() {
    return this
      .api
      .getFlyLocations()
      .pipe(
        tap((locations) => {
          this.flyLocations = locations;
          this.getLocationFormControl()?.enable();
        })
      );
  }

  loadFlyTypes(location: string) {
    this.flyTypes = [];

    return this
      .api
      .getFlyType(location)
      .pipe(
        tap((types) => {
          for (const type of types) {
            this.flyTypes.push({
              type: type.identifier,
              label: type.name,
              selected: false,
              price: null,
            });
          }
        })
      );
  }

  onLocationChange(location: string) {
    if (location === '') {
      return;
    }

    this
      .loadFlyTypes(location)
      .subscribe();
  }

  // Form fields
  getLocationFormControl(): AbstractControl | null {
    return this.paramForm.get('location');
  }

  getStartFormControl(): AbstractControl | null {
    return this.paramForm.get('start');
  }

  getEndFormControl(): AbstractControl | null {
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

    const start: Date | null = this.getStartFormControl()?.value;

    if (start === null) {
      return null;
    }

    if (start > new Date(control.value)) {
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

    const location = this.getLocationFormControl()?.value;
    const start = this.getStartFormControl()?.value;
    const end = this.getEndFormControl()?.value;

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
        if (added) {
          this.dialogRef.close(added);
        } else {
          this.loading = false;
        }
      });
  }

  // UX actions
  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 200);
  }
}
