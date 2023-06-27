import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {PasswordResetDialog} from "./modals/password-reset/password-reset-dialog.component";
import {PasswordResetRequestDialog} from "./modals/password-reset-request/password-reset-request.dialog";
import {LoginComponent} from "./components/login/login.component";

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
