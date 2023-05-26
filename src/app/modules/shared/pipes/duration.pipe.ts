import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(interval: string): number {
    const regex = /PT(?<hour>\d+H)?(?<minute>\d+M)?/g;
    const matches = regex.exec(interval);

    if (!matches || !matches.groups) {
      return NaN;
    }

    const {hour, minute} = matches.groups;

    const duration = {
      hour: hour ? parseInt(hour) : 0,
      minute: minute ? parseInt(minute) : 0,
    }

    return duration.hour * 60 + duration.minute;
  }
}
