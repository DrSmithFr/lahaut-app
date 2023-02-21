import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetRequestDialog } from './password-reset-request.dialog';
import {RouterTestingModule} from "@angular/router/testing";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PasswordResetDialog} from "../password-reset/password-reset-dialog.component";
import {ApiService} from "../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('PasswordResetRequestDialog', () => {
  beforeEach(async () => {
    const ApiServiceMock = jasmine.createSpyObj('ApiService', ['']);
    const MatDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const MatSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule
      ],
      declarations: [
        PasswordResetRequestDialog,
      ],
      providers: [
        {provide: ApiService, useValue: ApiServiceMock},
        {provide: MatSnackBar, useValue: MatSnackBarSpy},
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: {token: 'token'}},

      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PasswordResetRequestDialog);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
