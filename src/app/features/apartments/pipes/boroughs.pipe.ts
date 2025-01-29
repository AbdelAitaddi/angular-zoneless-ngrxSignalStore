import { Pipe, PipeTransform } from '@angular/core';

// models
import { Apartment } from '../models';

// config
import { All_Cities } from '../config';

@Pipe({
  name: 'byBoroughs',
  standalone: true,
})
export class BoroughsPipe implements PipeTransform {
  transform(apartments: Apartment[], borough: string | typeof All_Cities) {
    return borough !== All_Cities
      ? apartments.filter((apartment) => borough === apartment?.address?.borough)
      : apartments;
  }
}
