import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { FlyTypePipe } from './pipes/fly-type.pipe';
@NgModule({
  declarations: [
    DurationPipe,
    FlyTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DurationPipe,
    FlyTypePipe
  ]
})
export class SharedModule { }
