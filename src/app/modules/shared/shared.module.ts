import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from './pipes/duration.pipe';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ApiDatePipe } from './pipes/api-date.pipe';
import { InfoComponent } from './components/info/info.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    DurationPipe,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent,
  ],
    imports: [
        CommonModule,
        PhoneInputComponent,
        MatIconModule
    ],
  exports: [
    DurationPipe,
    PhoneInputComponent,
    TimeAgoPipe,
    ApiDatePipe,
    InfoComponent
  ]
})
export class SharedModule {
}
