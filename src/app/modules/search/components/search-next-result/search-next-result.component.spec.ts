import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchNextResultComponent} from './search-next-result.component';
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ApiService} from "../../../../services/api.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

describe('SearchNextAvailabilityComponent', () => {
  let component: SearchNextResultComponent;
  let fixture: ComponentFixture<SearchNextResultComponent>;

  beforeEach(async () => {
    const ApiServiceMock = jasmine.createSpyObj('ApiService', ['findSlots']);

    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule
      ],
      declarations: [
        SearchNextResultComponent,
        SearchResultsComponent
      ],
      providers: [
        {provide: ApiService, useValue: ApiServiceMock},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchNextResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
