import {TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {GoogleAnalyticsService} from "../../services/google-analytics.service";
import {MatFormFieldModule} from "@angular/material/form-field";

describe('LoginComponent', () => {
  beforeEach(async () => {
    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['isLogged', 'isCustomer', 'isMonitor']);
    const GoogleAnalyticsServiceMock = jasmine.createSpyObj('GoogleAnalyticsService', ['']);

    const MatDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const MatSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
      ],
      declarations: [
        LoginComponent,
      ],
      providers: [
        {provide: AuthService, useValue: AuthServiceMock},
        {provide: GoogleAnalyticsService, useValue: GoogleAnalyticsServiceMock},
        {provide: MatSnackBar, useValue: MatSnackBarSpy},
        {provide: MatDialog, useValue: MatDialogMock},

      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
