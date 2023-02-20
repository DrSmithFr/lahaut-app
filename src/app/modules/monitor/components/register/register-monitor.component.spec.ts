import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMonitorComponent } from './register-monitor.component';

describe('RegisterComponent', () => {
  let component: RegisterMonitorComponent;
  let fixture: ComponentFixture<RegisterMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
