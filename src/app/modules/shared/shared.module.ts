import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from './pipes/duration.pipe';
import {FlyTypePipe} from './pipes/fly-type.pipe';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';

@NgModule({
  declarations: [
    DurationPipe,
    FlyTypePipe,
  ],
  imports: [
    CommonModule,
    PhoneInputComponent
  ],
  exports: [
    DurationPipe,
    FlyTypePipe,
    PhoneInputComponent
  ]
})
export class SharedModule {
}
