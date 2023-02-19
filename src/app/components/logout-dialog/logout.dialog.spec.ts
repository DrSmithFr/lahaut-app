import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialog } from './logout.dialog';

describe('HomeComponent', () => {
  let component: LogoutDialog;
  let fixture: ComponentFixture<LogoutDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
