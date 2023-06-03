import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchQuery} from "../../models/search-query";
import {flyLocation, flyType} from "../../../../../environments/fly-location";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() urlParamQuery: SearchQuery;

  @Output() query = new EventEmitter<SearchQuery>();

  searchForm: FormGroup;

  flyLocations = flyLocation;
  flyTypes = flyType;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {
        location: [
          this.urlParamQuery?.location ?? '',
          [Validators.required]
        ],
        flyType: [
          this.urlParamQuery?.type ?? '',
          [Validators.required]
        ],
        date: [
          this.urlParamQuery?.date ?? '',
          [Validators.required]
        ],
        person: [
          this.urlParamQuery?.person ?? '1',
          [Validators.required]
        ],
      }
    );

    setTimeout(() => {
      this.trySubmit();
    })
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

    const location: string = this.searchForm.value.location;
    const flyType: string = this.searchForm.value.flyType;
    const date: Date = this.searchForm.value.date;
    const person: number = this.searchForm.value.person;

    if (!location || !flyType || date === undefined || person < 1) {
      console.error('Form is not valid');
      return;
    }

    const query = new SearchQuery(location, flyType, new Date(date), person);
    this.query.emit(query);
  }
}
