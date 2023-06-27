import { Pipe, PipeTransform } from '@angular/core';
import {DateService} from "../services/utils/date.service";

@Pipe({
  name: 'apiDate'
})
export class ApiDatePipe implements PipeTransform {

  constructor(
    private dateService: DateService,
  ) {
  }

  transform(value: string): Date {
    return this.dateService.makeDateFromString(value);
  }

}
