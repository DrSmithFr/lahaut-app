import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from '../api/pipes/duration.pipe';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';
import {TimeAgoPipe} from '../api/pipes/time-ago.pipe';
import {ApiDatePipe} from '../api/pipes/api-date.pipe';
import {InfoComponent} from './components/info/info.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    DurationPipe,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    PhoneInputComponent,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    DurationPipe,
    PhoneInputComponent,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent,
    NavigationComponent
  ]
})
export class SharedModule {
}
