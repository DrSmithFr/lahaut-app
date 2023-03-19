import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterMonitorComponent} from './components/register-monitor/register-monitor.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MonitorRoutingModule} from './monitor-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import { MyMonitorAccountComponent } from './components/my-monitor-account/my-monitor-account.component';
import {MatCardModule} from "@angular/material/card";


@NgModule(
  {
    declarations: [
      RegisterMonitorComponent,
      MyMonitorAccountComponent,
    ],
    imports: [
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
      MatIconModule,
      MatCardModule
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
