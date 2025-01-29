import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';

import { Apartment } from '../../models';
import ApartmentItemComponent from '../../components/apartment-item/apartment-item.component';
import { ApartmentOverviewStore } from '../../store/apartment-overview.store';
import { FavoriteApartmentsStore } from '../../store/apartment-favourites.store';

interface ViewModel {
  selected: boolean;
  apartment: Apartment | null;
  isPending: boolean;
}

@Component({
  standalone: true,
  imports: [ApartmentItemComponent, MatProgressSpinner],
  templateUrl: './apartment-overview.component.html',
  styleUrls: ['./apartment-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApartmentOverviewStore],
})
export default class ApartmentOverviewComponent {
  readonly #location = inject(Location);
  readonly #favoritesStore = inject(FavoriteApartmentsStore);
  readonly #overviewStore = inject(ApartmentOverviewStore);

  viewModel: Signal<ViewModel> = computed(() => ({
    selected: this.#overviewStore.selected(),
    apartment: this.#overviewStore.apartment(),
    isPending: this.#overviewStore.isPending(),
  }));

  onSave(apartment: Apartment) {
    this.#favoritesStore.addToFavourites(apartment);
  }

  onRemove(apartment: Apartment) {
    this.#favoritesStore.removeFromFavourites(apartment);
  }

  onBack() {
    this.#location.back();
  }
}
