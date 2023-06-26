import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanningRoutingModule} from './planning-routing.module';
import {PlanningComponent} from './pages/planning/planning.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {PlanningRowComponent} from './components/planning-row/planning-row.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import {RemoveHourAvailabilityDialog} from './modals/remove-hour-availability/remove-hour-availability.dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {SlotsListComponent} from './components/slots-list/slots-list.component';
import {MatMenuModule} from "@angular/material/menu";
import {
  RemovePeriodAvailabilityDialog
} from './modals/remove-period-availability/remove-period-availability.dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddAvailabilityDialog} from './modals/add-availability/add-availability.dialog';
import {MatSelectModule} from "@angular/material/select";
import {AddAvailabilityConfirmDialog} from './modals/add-availability-confirm/add-availability-confirm.dialog';
import {SlotsListPreviewComponent} from './components/slots-list-preview/slots-list-preview.component';
import {PlanningResultComponent} from './components/planning-result/planning-result.component';
import {MatOptionModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    PlanningComponent,
    PlanningRowComponent,
    RemoveHourAvailabilityDialog,
    SlotsListComponent,
    RemovePeriodAvailabilityDialog,
    AddAvailabilityDialog,
    AddAvailabilityConfirmDialog,
    SlotsListPreviewComponent,
    PlanningResultComponent
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
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule
    ],
  exports: [
    PlanningResultComponent,
    RemovePeriodAvailabilityDialog,
    AddAvailabilityDialog
  ]
})
export class PlanningModule {
}
