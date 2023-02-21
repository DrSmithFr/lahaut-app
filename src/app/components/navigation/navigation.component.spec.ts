import {TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../services/auth.service";

describe('NavigationComponent', () => {
  beforeEach(async () => {
    const MatDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['isLogged', 'isCustomer', 'isMonitor']);

    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [
        NavigationComponent
      ],
      providers: [
        {provide: MatDialog, useValue: MatDialogMock},
        {provide: AuthService, useValue: AuthServiceMock},
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
