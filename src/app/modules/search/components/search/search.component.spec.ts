import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApiService} from "../../../../services/api.service";
import {SearchFormComponent} from "../search-form/search-form.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    const ApiServiceMock = jasmine.createSpyObj('ApiService', ['findSlots']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatListModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      declarations: [
        SearchComponent,
        SearchFormComponent,
        SearchResultsComponent
      ],
      providers: [
        {provide: ApiService, useValue: ApiServiceMock},
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({id: 123})
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
