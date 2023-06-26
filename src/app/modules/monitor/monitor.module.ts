import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MonitorRoutingModule} from './monitor-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {SharedModule} from "../shared/shared.module";
import {RegisterMonitorComponent} from "./pages/register-monitor/register-monitor.component";
import {MyMonitorAccountComponent} from "./pages/my-monitor-account/my-monitor-account.component";


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
      MatCardModule,
      MatStepperModule,
      SharedModule,
    ],
    providers: [
      {
        provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
          hasBackdrop: true
        }
      }
    ]
  }
)
export class MonitorModule {
}
