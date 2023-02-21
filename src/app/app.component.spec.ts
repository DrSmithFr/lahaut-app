import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SwPush, SwUpdate} from "@angular/service-worker";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {AuthService} from "./services/auth.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";

describe('AppComponent', () => {
  beforeEach(async () => {
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const SwPushMock = jasmine.createSpyObj('SwPush', ['notificationClicks']);
    const SwUpdateMock = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'versionUpdates']);
    const MatDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['isLogged', 'isCustomer', 'isMonitor']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: SwPush, useValue: SwPushMock },
        { provide: SwUpdate, useValue: SwUpdateMock },
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: AuthService, useValue: AuthServiceMock },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeDefined();
  });
});
