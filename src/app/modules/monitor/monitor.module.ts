import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterMonitorComponent} from './components/register/register-monitor.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MonitorRoutingModule} from './monitor-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";


@NgModule(
  {
    declarations: [
      RegisterMonitorComponent,
    ],
    imports:      [
      CommonModule,

      // routing
      MonitorRoutingModule,

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
export class MonitorModule {
}
