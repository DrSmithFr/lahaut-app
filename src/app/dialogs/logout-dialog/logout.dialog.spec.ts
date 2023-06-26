import {TestBed} from '@angular/core/testing';

import {LogoutDialog} from './logout.dialog';
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../modules/api/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('LogoutDialog', () => {
  beforeEach(async () => {
    const MatDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['isLogged', 'isCustomer', 'isMonitor']);
    const MatSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [
        LogoutDialog,
      ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: AuthService, useValue: AuthServiceMock},
        {provide: MatSnackBar, useValue: MatSnackBarSpy},

      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LogoutDialog);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
