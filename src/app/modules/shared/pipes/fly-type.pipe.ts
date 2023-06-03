import { Pipe, PipeTransform } from '@angular/core';
import {flyType} from "../../../../environments/fly-location";

@Pipe({
  name: 'flyType'
})
export class FlyTypePipe implements PipeTransform {

  flyTypes = flyType

  transform(type: string): string {
    const flyType = this.flyTypes.get(type);

    if (flyType === undefined) {
      return type;
    }

    return flyType;
  }

}
