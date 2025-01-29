import { ChangeDetectionStrategy, Component, computed, inject, Injector, OnInit, Signal } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TranslatePipe } from '@ngx-translate/core';
import { getState } from '@ngrx/signals';

import { BoroughsPipe } from '../../pipes';

import { Apartment, CityTypes, CityTypesFilter } from '../../models';

import ApartmentFilterComponent from '../../components/apartment-filter/apartment-filter.component';
import ApartmentPreviewListComponent from '../../components/apartment-preview-list/apartment-preview-list.component';

import { All_Cities } from '../../config';
import { ApartmentSearchState, ApartmentSearchStore, Query } from '../../store/apartment-search.store';
import { FavoriteApartmentsStore } from '../../store/apartment-favourites.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export interface ViewModel extends ApartmentSearchState {
  cities: CityTypes[];
  boroughs: string[];
  favouritesIds: string[];
  apartments: Apartment[];
  isPending: boolean;
  isFulfilled: boolean;
  error: string | null;
}

@Component({
  imports: [
    BoroughsPipe,
    TranslatePipe,
    ApartmentPreviewListComponent,
    ApartmentFilterComponent,
    InfiniteScrollDirective,
    CdkScrollable,
    MatProgressSpinner,
  ],
  standalone: true,
  templateUrl: './apartment-search.component.html',
  styleUrls: ['./apartment-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentSearchComponent implements OnInit {
  readonly #injector: Injector;
  readonly #route = inject(ActivatedRoute);
  readonly #searchStore = inject(ApartmentSearchStore);
  readonly #favoritesStore = inject(FavoriteApartmentsStore);

  viewModel: Signal<ViewModel> = computed(() => ({
    ...getState(this.#searchStore),
    boroughs: this.#searchStore.boroughs(),
    cities: this.#searchStore.cities(),
    isPending: this.#searchStore.isPending(),
    isFulfilled: this.#searchStore.isFulfilled(),
    error: this.#searchStore.error(),
    apartments: this.#searchStore.entities(),
    favouritesIds: this.#favoritesStore.ids() as string[],
  }));

  constructor() {
    this.#searchStore.updateSelectedCity(this.#route.queryParams, this.#injector);
  }

  ngOnInit() {
    const query = this.#searchStore.query as Signal<Query>;
    this.#searchStore.getApartments(query);
  }

  onScrollDown() {
    this.#searchStore.loadMore();
  }

  onCityChange(city: CityTypesFilter) {
    this.#searchStore.updateCity(city);
  }

  onBoroughChange(boroughs: string | typeof All_Cities) {
    this.#searchStore.updateBorough(boroughs);
  }
}
