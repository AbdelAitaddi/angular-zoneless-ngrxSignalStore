import { All_Cities, Cities } from '../config';

export type CityTypes = (typeof Cities)[keyof typeof Cities];

export type CityTypesFilter = CityTypes | typeof All_Cities;
