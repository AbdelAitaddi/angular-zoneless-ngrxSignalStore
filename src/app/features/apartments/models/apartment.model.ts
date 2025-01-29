import { Address } from './adress.model';
import { Rent } from './rent.model';
import { Localization } from './Localization.model';

export interface Apartment {
  id: string;
  internalId?: number;
  type?: string;
  address: Address;
  availableFromDate: Date;
  availableFromNowOn: boolean;
  teaserImageUrl: string;
  localization: Localization;
  title: string;
  description: string;
  details: {
    size: number;
    numberOfRooms: number;
    rent: Rent;
    floor: number;
  };
}
