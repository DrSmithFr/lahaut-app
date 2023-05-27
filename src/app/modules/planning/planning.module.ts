import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanningRoutingModule} from './planning-routing.module';
import {PlanningComponent} from './components/planning/planning.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import { PlanningRowComponent } from './components/planning-row/planning-row.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    PlanningComponent,
    PlanningRowComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule
  ]
})
export class PlanningModule {
}
