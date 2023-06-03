import {Pipe, PipeTransform} from '@angular/core';
import {flyLocation} from "../../../../environments/fly-location";

@Pipe({
  name: 'flyLocation'
})
export class FlyLocationPipe implements PipeTransform {
  flyLocations = flyLocation

  transform(type: string): string {
    const location = this.flyLocations.get(type);

    if (location === undefined) {
      return type;
    }

    return location;
  }
}
