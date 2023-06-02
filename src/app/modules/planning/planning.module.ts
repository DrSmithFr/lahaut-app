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
import {RemoveHourAvailabilityDialog} from './components/remove-hour-availability/remove-hour-availability.dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {SlotsListComponent} from './components/slots-list/slots-list.component';
import {MatMenuModule} from "@angular/material/menu";
import { RemovePeriodAvailabilityDialog } from './components/remove-period-availability/remove-period-availability.dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    PlanningComponent,
    PlanningRowComponent,
    RemoveHourAvailabilityDialog,
    SlotsListComponent,
    RemovePeriodAvailabilityDialog
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    SharedModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
})
export class PlanningModule {
}
