import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from '../api/pipes/duration.pipe';
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
import {UnsubscribeOnDestroyComponent} from "./components/unsubscribe-on-destroy.component";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    DurationPipe,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent,
    NavigationComponent,
    UnsubscribeOnDestroyComponent
  ],
  imports: [
    CommonModule,
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
    NgxMaskModule
  ],
  exports: [
    DurationPipe,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent,
    NavigationComponent,

    UnsubscribeOnDestroyComponent
  ]
})
export class SharedModule {
}
