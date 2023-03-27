import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SearchQuery} from "../../models/search-query";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Output() query = new EventEmitter<SearchQuery>();

  searchForm = this.fb.group(
    {
      location: ['', [Validators.required]],
      flyType: ['', [Validators.required]],
      date: ['', [Validators.required]],
      person: ['adult', [Validators.required]],
    }
  );

  constructor(
    private fb: FormBuilder,
  ) {
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

    const location = this.searchForm.value.location;
    const flyType = this.searchForm.value.flyType;
    const date = this.searchForm.value.date;

    if (!location || !flyType || !date) {
      console.error('Form is not valid');
      return;
    }

    const query = new SearchQuery(location, flyType, new Date(date));
    this.query.emit(query);
  }
}
