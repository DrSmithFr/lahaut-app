import {TestBed} from '@angular/core/testing';

import {RegisterMonitorComponent} from './register-monitor.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthService} from "../../../../services/auth.service";
import {ApiService} from "../../../../services/api.service";
import {GoogleAnalyticsService} from "../../../../services/google-analytics.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepperModule} from "@angular/material/stepper";

describe('RegisterMonitorComponent', () => {
  beforeEach(async () => {
    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['isLogged', 'isCustomer', 'isMonitor']);
    const ApiServiceMock = jasmine.createSpyObj('ApiService', ['']);
    const GoogleAnalyticsServiceMock = jasmine.createSpyObj('GoogleAnalyticsService', ['']);

    const MatSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatStepperModule,
      ],
      declarations: [
        RegisterMonitorComponent,
      ],
      providers: [
        {provide: AuthService, useValue: AuthServiceMock},
        {provide: ApiService, useValue: ApiServiceMock},
        {provide: GoogleAnalyticsService, useValue: GoogleAnalyticsServiceMock},
        {provide: MatSnackBar, useValue: MatSnackBarSpy},

      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterMonitorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
