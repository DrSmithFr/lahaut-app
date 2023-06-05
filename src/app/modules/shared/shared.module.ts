import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from './pipes/duration.pipe';
import {FlyTypePipe} from './pipes/fly-type.pipe';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { FlyLocationPipe } from './pipes/fly-location.pipe';
import { ApiDatePipe } from './pipes/api-date.pipe';

@NgModule({
  declarations: [
    DurationPipe,
    FlyTypePipe,
    TimeAgoPipe,
    FlyLocationPipe,
    ApiDatePipe,
  ],
  imports: [
    CommonModule,
    PhoneInputComponent
  ],
  exports: [
    DurationPipe,
    FlyTypePipe,
    PhoneInputComponent,
    TimeAgoPipe,
    FlyLocationPipe,
    ApiDatePipe
  ]
})
export class SharedModule {
}
