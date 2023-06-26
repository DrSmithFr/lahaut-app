import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMonitorAccountComponent } from './my-monitor-account.component';
import {MatCardModule} from "@angular/material/card";

describe('MyMonitorAccountComponent', () => {
  let component: MyMonitorAccountComponent;
  let fixture: ComponentFixture<MyMonitorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ MyMonitorAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMonitorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
