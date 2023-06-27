import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SearchQuery} from "../../models/search-query";
import {ApiService} from "../../../api/services/api.service";
import {LocationModel} from "../../../api/models/activity/location.model";
import {TypeModel} from "../../../api/models/activity/type-model";
import {tap} from "rxjs/operators";
import {concat} from "rxjs";
import {BreakpointService, Devices} from "../../../../services/breakpoint.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() urlParamQuery: SearchQuery;

  @Output() query = new EventEmitter<SearchQuery>();

  searchForm = this.fb.group(
    {
      location: new FormControl<string | null>({
        value: '',
        disabled: true,
      }, [Validators.required]),
      activityType: new FormControl<string | null>({
        value: '',
        disabled: true,
      }, [Validators.required]),
      date: new FormControl<Date | null>(null, [Validators.required]),
      person: new FormControl<string | null>("1", [Validators.required]),
    }
  );

  activityLocations: LocationModel[];
  activityTypes: TypeModel[];

  // Datepicker options
  toucheUi = false;
  autoOpen = false;

  constructor(
    private fb: FormBuilder,
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

  ngOnInit(): void {
    const location = this.urlParamQuery?.location ?? '';
    const activityType = this.urlParamQuery?.type ?? '';
    const date = this.urlParamQuery?.date ?? '';
    const person = this.urlParamQuery?.person ?? 1;

    console.log('person', person);

    const obs = [];

    obs.push(this.loadActivityLocations());

    if (location !== '') {
      obs.push(this.loadActivityTypes(location));
    }

    concat(...obs).subscribe(() => {
      this
        .searchForm
        .patchValue({
          location,
          activityType,
          date,
          person: '' + person,
        });

      setTimeout(() => {
        this.trySubmit();
      })
    });
  }

  loadActivityLocations() {
    return this
      .api
      .getFlyLocations()
      .pipe(
        tap((locations) => {
          this.activityLocations = locations;
          this.getLocationFormControl()?.enable();
        })
      );
  }

  loadActivityTypes(location: string) {
    this.getActivityTypeFormControl()?.setValue('');
    this.getActivityTypeFormControl()?.disable();

    return this
      .api
      .getFlyType(location)
      .pipe(
        tap((types) => {
          this.activityTypes = types;
          this.getActivityTypeFormControl()?.enable();
        })
      )
  }

  onLocationChange(location: string) {
    if (location === '') {
      return;
    }

    this
      .loadActivityTypes(location)
      .subscribe(() => {
        this.trySubmit();
      });
  }

  getLocationFormControl() {
    return this.searchForm.get('location');
  }

  getActivityTypeFormControl() {
    return this.searchForm.get('activityType');
  }

  getPersonFormControl() {
    return this.searchForm.get('person');
  }

  getDateFormControl() {
    return this.searchForm.get('date');
  }

  trySubmit() {
    if (this.searchForm.valid) {
      this.onSubmit()
    }
  }


  onSubmit() {
    if (!this.searchForm.valid) {
      console.error('Form is not valid')
      return;
    }

    const location = this.getLocationFormControl()?.value ?? null;
    const activityType = this.getActivityTypeFormControl()?.value ?? null;
    const date = this.getDateFormControl()?.value ?? null;
    const person = parseInt(this.getPersonFormControl()?.value ?? "0");

    if (!location || !activityType || date === null || person === null || person < 1) {
      console.error('Form is not valid');
      return;
    }

    const query = new SearchQuery(location, activityType, date, person);
    this.query.emit(query);
  }
}
