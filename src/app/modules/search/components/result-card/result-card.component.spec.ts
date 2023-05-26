import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultCardComponent} from './result-card.component';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;

  beforeEach(async () => {
    const MatDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const MatDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ResultCardComponent],
      providers: [
        {provide: MatDialog, useValue: MatDialogMock},
        {provide: MatDialogRef, useValue: MatDialogRefMock},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
