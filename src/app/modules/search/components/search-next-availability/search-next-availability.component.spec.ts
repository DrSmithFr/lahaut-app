import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchNextAvailabilityComponent} from './search-next-availability.component';
import {ResultComponent} from "../result/result.component";
import {ApiService} from "../../../../services/api.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

describe('SearchNextAvailabilityComponent', () => {
  let component: SearchNextAvailabilityComponent;
  let fixture: ComponentFixture<SearchNextAvailabilityComponent>;

  beforeEach(async () => {
    const ApiServiceMock = jasmine.createSpyObj('ApiService', ['findSlots']);

    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule
      ],
      declarations: [
        SearchNextAvailabilityComponent,
        ResultComponent
      ],
      providers: [
        {provide: ApiService, useValue: ApiServiceMock},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchNextAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
