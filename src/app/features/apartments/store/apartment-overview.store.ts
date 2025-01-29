import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps } from '@ngrx/signals';
import { Router } from '@angular/router';

import { filter, finalize, pipe, retry } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { ApartmentSearchStore } from './apartment-search.store';
import { FavoriteApartmentsStore } from './apartment-favourites.store';

import { NotFoundError } from '../../../core/helpers';
import { ApartmentsService } from '../services/apartments.service';
import { GlobalLoadingIndicatorService } from '../../../core/services/global-loading-indicator.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/core/state/request-status.feature';
import { withRouteParams } from '../../../shared/core/state/route-params.feature';
import { withLogger } from '../../../shared/core/state/logger.feature';

export const ApartmentOverviewStore = signalStore(
  withRequestStatus(),
  withLogger('ApartmentOverviewStore'),
  withRouteParams({ apartmentId: (param) => param as string }),
  withProps(() => ({
    _listStore: inject(ApartmentSearchStore),
    _favoritesStore: inject(FavoriteApartmentsStore),
    _apartmentsService: inject(ApartmentsService),
    _loadingIndicator: inject(GlobalLoadingIndicatorService),
    _router: inject(Router),
  })),
  withComputed(({ apartmentId, _listStore, _favoritesStore }) => ({
    apartment: computed(() => (apartmentId() ? _listStore.entityMap()[apartmentId()!] : null)),
    selected: computed(() => Boolean(_favoritesStore.ids().includes(apartmentId() || ''))),
  })),
  withMethods(({ _listStore, ...store }) => ({
    loadApartmentIfNotLoaded: rxMethod<string | null>(
      pipe(
        filter(Boolean),
        filter((id) => !_listStore.entityMap()[id]),
        tap(() => patchState(store, setPending())),
        switchMap((id) =>
          store._apartmentsService.getApartment(id).pipe(
            tapResponse({
              next: (apartment) => {
                _listStore.updateApartment(apartment);
                patchState(store, setFulfilled());
              },
              error: (err: Error) => {
                patchState(store, setError(err.message));

                return err instanceof NotFoundError
                  ? store._router.navigateByUrl('/not-found', { skipLocationChange: true })
                  : store._router.navigateByUrl('/app-unavailable', { skipLocationChange: true });
              },
            }),
            retry({
              count: 2,
              delay: 1000,
              resetOnSuccess: true,
            }),
            finalize(() => store._loadingIndicator.loadingOff()),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit({ loadApartmentIfNotLoaded, apartmentId }) {
      loadApartmentIfNotLoaded(apartmentId);
    },
    onDestroy() {
      console.info('Overview component on destroy...');
    },
  }),
);
