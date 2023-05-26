import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flyType'
})
export class FlyTypePipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case 'discovery':
        return 'vol Découverte';
      case 'freestyle':
        return 'vol Freestyle';
      case 'xl':
        return 'vol XL';
      default:
        return 'Unknown';
    }
  }

}
