import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';

import { Apartment } from '../models';

import { withLogger } from '../../../shared/core/state/logger.feature';
import { withStorageSync } from '../../../shared/core/state/storage-sync.feature';

export const FavoriteApartmentsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Apartment>(),
  withLogger('FavoriteApartmentsStore'),
  withStorageSync('favoriteApartmentState'),
  withMethods((store) => ({
    addToFavourites(apartment: Apartment) {
      patchState(store, addEntity(apartment));
    },
    removeFromFavourites(apartment: Apartment) {
      patchState(store, removeEntity(apartment.id));
    },
  })),
);
