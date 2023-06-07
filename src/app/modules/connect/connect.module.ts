import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PasswordResetDialog} from "./components/password-reset/password-reset-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {PasswordResetRequestDialog} from "./components/password-reset-request/password-reset-request.dialog";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetDialog,
    PasswordResetRequestDialog,
  ],
  imports: [
    CommonModule,

    // importing reactive form
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterLink
  ],
  exports: [
    LoginComponent,
  ]
})
export class ConnectModule {
}
