import { All_Cities, Cities } from '../config';
import { computed, inject, InjectionToken, Injector, Signal, signal } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { Params, Router } from '@angular/router';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, exhaustMap, Observable, of, pipe, retry } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { ShareReplayLatest } from '../../../../support/rxjs-operators';

import { Apartment, CityTypesFilter, Statistics } from '../models';
import { StatisticsService } from '../services/statistics.service';
import { ApartmentHelperService } from '../helpers/apartment-helper.service';
import { ApartmentsService } from '../services/apartments.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/core/state/request-status.feature';

import { addEntities, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { withLogger } from '../../../shared/core/state/logger.feature';

export interface Query {
  nextPage: number;
  selectedCity: CityTypesFilter;
}

export interface ApartmentSearchState {
  statistics: Statistics | null;
  selectedBorough: string | typeof All_Cities;
  selectedCity: CityTypesFilter;
  pageNumber: number;
  allDataLoaded: boolean;
  query?: Query;
}

const initialState: ApartmentSearchState = {
  statistics: null,
  selectedBorough: All_Cities,
  selectedCity: All_Cities,
  pageNumber: 1,
  allDataLoaded: false,
  query: { nextPage: 1, selectedCity: All_Cities },
};

const APARTMENTS_STATE = new InjectionToken<ApartmentSearchState>('ApartmentsState', {
  providedIn: 'root',
  factory: () => initialState,
});

export const ApartmentSearchStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(APARTMENTS_STATE)),
  withEntities<Apartment>(),
  withLogger('ApartmentSearchStore'),
  withRequestStatus(),
  withProps(() => ({
    _apartmentHelper: inject(ApartmentHelperService),
    _apartmentsService: inject(ApartmentsService),
    _statisticsService: inject(StatisticsService),
    _router: inject(Router),
  })),
  withComputed(({ selectedCity, entities, _apartmentHelper }) => ({
    boroughs: computed(() => _apartmentHelper.getMappedBoroughs(entities(), selectedCity())),
    cities: signal(Object.values(Cities)).asReadonly(),
  })),
  withMethods(
    ({ pageNumber, selectedCity, isFulfilled, _router, _statisticsService, _apartmentsService, ...store }) => ({
      updateBorough(selectedBorough: string | typeof All_Cities): void {
        patchState(store, { selectedBorough });
      },
      updateApartment(apartment: Apartment) {
        patchState(store, setEntity(apartment));
      },
      reset() {
        patchState(store, { ...initialState });
      },
      updateCity(city: CityTypesFilter): void {
        _router.navigate([], { queryParams: { city }, queryParamsHandling: 'merge' }).then(() => {
          patchState(store, {
            requestStatus: 'idle',
            allDataLoaded: false,
            query: { selectedCity: city, nextPage: 1 },
            pageNumber: 1,
            selectedCity: city,
            selectedBorough: All_Cities,
          });
        });
      },
      loadMore(): void {
        patchState(store, {
          query: { nextPage: pageNumber() + 1, selectedCity: selectedCity() },
        });
      },
      updateSelectedCity(queryParams: Observable<Params>, injector: Injector): void {
        const queryParams$ = queryParams.pipe(
          distinctUntilChanged(),
          map((params: Params) => params['city'] || All_Cities),
        );

        const selectedCityParam = toSignal(queryParams$, { injector }) as Signal<CityTypesFilter>;

        if (selectedCityParam() !== selectedCity() || !isFulfilled()) {
          patchState(store, {
            requestStatus: 'idle',
            allDataLoaded: false,
            pageNumber: 1,
            selectedCity: selectedCityParam(),
            query: { nextPage: 1, selectedCity: selectedCityParam() },
            selectedBorough: All_Cities,
          });
        }
      },
      getApartments: rxMethod<Query>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, setPending())),
          exhaustMap((request) =>
            _apartmentsService.getApartments(request.selectedCity, request.nextPage).pipe(
              take(1),
              map((LoadedApartments: Apartment[]) =>
                LoadedApartments.filter((apartment: Apartment) => apartment.availableFromNowOn),
              ),
              tapResponse({
                next: (list: Apartment[]) => {
                  patchState(store, request.nextPage === 1 ? setAllEntities(list) : addEntities(list), {
                    ...setFulfilled(),
                    pageNumber: request.nextPage,
                    selectedCity: request.selectedCity,
                    allDataLoaded: !list.length,
                  });
                },
                error: (error: { message: string }) => {
                  patchState(store, setError(error.message));
                  return of([]);
                },
              }),
              retry({
                count: 2,
                delay: 1000,
                resetOnSuccess: true,
              }),
            ),
          ),
        ),
      ),
      getStatistics$: rxMethod<void>(
        pipe(
          switchMap(() =>
            _statisticsService.getStatistics().pipe(
              tapResponse({
                next: (statistics: Statistics) => patchState(store, { statistics }),
                error: () => _router.navigateByUrl('/app-unavailable', { skipLocationChange: true }),
              }),
              retry({
                count: 2,
                delay: 1000,
                resetOnSuccess: true,
              }),
              ShareReplayLatest(),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks({
    onInit({ getStatistics$ }) {
      getStatistics$();
    },
  }),
);
