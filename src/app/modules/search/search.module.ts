import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SearchPage} from "./pages/search/search.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SearchFormComponent} from './components/search-form/search-form.component';
import {ResultComponent} from './components/result/result.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {ResultCardComponent} from './components/result-card/result-card.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  SearchNextAvailabilityComponent
} from './components/search-next-availability/search-next-availability.component';
import {ResultRowComponent} from './components/result-row/result-row.component';
import {AddToCartDialog} from './modals/add-to-cart/add-to-cart.dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";
import {GoogleMapsModule} from '@angular/google-maps';
import {FlyMapComponent} from './components/fly-map/fly-map.component';
import {FlyMeetingMapComponent} from './components/fly-meeting-map/fly-meeting-map.component'
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    SearchPage,
    SearchFormComponent,
    ResultComponent,
    ResultCardComponent,
    SearchNextAvailabilityComponent,
    ResultRowComponent,
    AddToCartDialog,
    FlyMapComponent,
    FlyMeetingMapComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    SearchRoutingModule,

    //google maps
    GoogleMapsModule,

    // importing reactive form
    FormsModule,
    ReactiveFormsModule,

    // users modules
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class SearchModule {
}
