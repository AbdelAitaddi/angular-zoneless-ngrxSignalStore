import { CityTypes } from './city.model';

export interface Address {
  streetName: string;
  houseNumber: number;
  postalCode: number;
  borough: string;
  city: CityTypes;
  countryCode: string;
}
