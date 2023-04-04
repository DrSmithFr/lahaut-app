import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchQuery} from "../../models/search-query";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() defaultQuery: SearchQuery;

  @Output() query = new EventEmitter<SearchQuery>();

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {
        location: [
          this.defaultQuery?.location ?? '',
          [Validators.required]
        ],
        flyType: [
          this.defaultQuery?.type ?? '',
          [Validators.required]
        ],
        date: [
          this.defaultQuery?.date ?? '',
          [Validators.required]
        ],
        person: [
          this.defaultQuery?.person ?? '1',
          [Validators.required]
        ],
      }
    );

    this.onSubmit();
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
