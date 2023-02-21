import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetRequestDialog } from './password-reset-request.dialog';

describe('LoginComponent', () => {
  let component: PasswordResetRequestDialog;
  let fixture: ComponentFixture<PasswordResetRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
