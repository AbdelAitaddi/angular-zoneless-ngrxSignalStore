import { Injectable } from '@angular/core';
import { uniq } from 'lodash';

// models
import { Apartment, CityTypesFilter } from '../models';

// config
import { All_Cities } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ApartmentHelperService {
  getMappedBoroughs(apartments: Apartment[], selectedCity: CityTypesFilter): string[] {
    const apartmentsBvCity =
      selectedCity !== All_Cities
        ? apartments.filter(
            (apartment: Apartment) => apartment.address.city.toLocaleLowerCase() === selectedCity.toLocaleLowerCase()
          )
        : apartments;
    return uniq(apartmentsBvCity.map(({ address: { borough } }: Apartment) => borough));
  }
}
