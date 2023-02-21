import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetDialog } from './password-reset-dialog.component';

describe('LoginComponent', () => {
  let component: PasswordResetDialog;
  let fixture: ComponentFixture<PasswordResetDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
