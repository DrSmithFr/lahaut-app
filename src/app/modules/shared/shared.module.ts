import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DurationPipe} from './pipes/duration.pipe';
import {FlyTypePipe} from './pipes/fly-type.pipe';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    DurationPipe,
    FlyTypePipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    PhoneInputComponent
  ],
    exports: [
        DurationPipe,
        FlyTypePipe,
        PhoneInputComponent,
        TimeAgoPipe
    ]
})
export class SharedModule {
}
