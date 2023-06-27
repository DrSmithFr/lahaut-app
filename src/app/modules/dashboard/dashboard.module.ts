import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {PlanningModule} from "../planning/planning.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PlanningModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
