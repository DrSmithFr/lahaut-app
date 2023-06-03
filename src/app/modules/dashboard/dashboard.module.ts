import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PlanningModule} from "../planning/planning.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PlanningModule,
    MatProgressBarModule
  ]
})
export class DashboardModule { }
