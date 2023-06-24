import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SearchQuery} from "../../models/search-query";
import {ApiService} from "../../../../services/api.service";
import {FlyLocationModel} from "../../../../models/fly/FlyLocationModel";
import {FlyTypeModel} from "../../../../models/fly/FlyTypeModel";
import {tap} from "rxjs/operators";
import {concat} from "rxjs";

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
      location: new FormControl<string|null>({
        value: '',
        disabled: true,
      }, [Validators.required]),
      flyType: new FormControl<string|null>({
        value: '',
        disabled: true,
      }, [Validators.required]),
      date: new FormControl<Date|null>(null, [Validators.required]),
      person: new FormControl<string|null>("1", [Validators.required]),
    }
  );

  flyLocations: FlyLocationModel[];
  flyTypes: FlyTypeModel[];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    const location = this.urlParamQuery?.location ?? '';
    const flyType = this.urlParamQuery?.type ?? '';
    const date = this.urlParamQuery?.date ?? '';
    const person = this.urlParamQuery?.person ?? 1;

    console.log('person', person);

    const obs = [];

    obs.push(this.loadFlyLocations());

    if (location !== '') {
      obs.push(this.loadFlyTypes(location));
    }

    concat(...obs).subscribe(() => {
      this
        .searchForm
        .patchValue({
          location,
          flyType,
          date,
          person: ''+person,
        });

      setTimeout(() => {
        this.trySubmit();
      })
    });
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
    this.getFlyTypeFormControl()?.setValue('');
    this.getFlyTypeFormControl()?.disable();

    return this
      .api
      .getFlyType(location)
      .pipe(
        tap((types) => {
          this.flyTypes = types;
          this.getFlyTypeFormControl()?.enable();
        })
      )
  }

  onLocationChange(location: string) {
    if (location === '') {
      return;
    }

    this
      .loadFlyTypes(location)
      .subscribe(() => {
        this.trySubmit();
      });
  }

  getLocationFormControl() {
    return this.searchForm.get('location');
  }

  getFlyTypeFormControl() {
    return this.searchForm.get('flyType');
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
    const flyType = this.getFlyTypeFormControl()?.value ?? null;
    const date = this.getDateFormControl()?.value ?? null;
    const person = parseInt(this.getPersonFormControl()?.value ?? "0");

    if (!location || !flyType || date === null || person === null || person < 1) {
      console.error('Form is not valid');
      return;
    }

    const query = new SearchQuery(location, flyType, date, person);
    this.query.emit(query);
  }
}
