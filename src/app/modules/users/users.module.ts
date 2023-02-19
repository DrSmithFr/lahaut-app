import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {UsersRoutingModule} from './users-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";


@NgModule(
  {
    declarations: [
      // subRoot component when logged
      LoginComponent,
      RegisterComponent,
    ],
    imports:      [
      CommonModule,

      // routing
      UsersRoutingModule,

      // importing reactive form
      FormsModule,
      ReactiveFormsModule,

      // users modules
      MatInputModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatCheckboxModule,
      MatDialogModule,
      MatIconModule
    ],
    providers:    [
      {
        provide:  MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
          hasBackdrop: true
        }
      }
    ]
  }
)
export class UsersModule {
}
