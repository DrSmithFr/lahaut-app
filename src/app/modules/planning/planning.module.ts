import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanningRoutingModule} from './planning-routing.module';
import {PlanningComponent} from './components/planning/planning.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {PlanningRowComponent} from './components/planning-row/planning-row.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import {RemoveAvailabilityDialog} from './components/remove-availability/remove-availability.dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {SlotsListComponent} from './components/slots-list/slots-list.component';


@NgModule({
  declarations: [
    PlanningComponent,
    PlanningRowComponent,
    RemoveAvailabilityDialog,
    SlotsListComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    SharedModule,
    MatDialogModule
  ],
})
export class PlanningModule {
}
