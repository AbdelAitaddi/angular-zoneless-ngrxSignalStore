import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import ApartmentPreviewListComponent from '../../components/apartment-preview-list/apartment-preview-list.component';
import { FavoriteApartmentsStore } from '../../store/apartment-favourites.store';
import { Apartment } from '../../models';

interface ViewModel {
  favouritesIds: string[];
  favoriteApartments: Apartment[];
}

@Component({
  standalone: true,
  imports: [ApartmentPreviewListComponent, TranslatePipe],
  templateUrl: './apartment-favorites.component.html',
  styleUrls: ['./apartment-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentFavoritesComponent {
  readonly #favoritesStore = inject(FavoriteApartmentsStore);

  readonly viewModel: Signal<ViewModel> = computed(() => ({
    favouritesIds: this.#favoritesStore.ids() as string[],
    favoriteApartments: this.#favoritesStore.entities(),
  }));
}
