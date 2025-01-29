import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// components
import ApartmentPreviewComponent from '../apartment-preview/apartment-preview.component';
import ApartmentCountPreviewComponent from '../apartment-count-preview/apartment-count-preview.component';

// models
import { Apartment, CityTypesFilter, Statistics } from '../../models';

// config
import { All_Cities } from '../../config';
import { TranslatePipe } from '@ngx-translate/core';

function ApartmentTransformAttribute(apartments: Apartment[] | undefined): Apartment[] {
  return apartments ?? [];
}

@Component({
  selector: 'app-apartment-preview-list',
  standalone: true,
  imports: [ApartmentPreviewComponent, ApartmentCountPreviewComponent, TranslatePipe],
  templateUrl: './apartment-preview-list.component.html',
  styleUrls: ['./apartment-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentPreviewListComponent {
  favouritesIds = input.required<string[]>();
  apartments = input.required({ transform: ApartmentTransformAttribute });
  showLocation = input<boolean, boolean>(false, { transform: booleanAttribute });
  allDataLoaded = input<boolean, boolean>(false, { transform: booleanAttribute });
  statistics = input<Statistics | null>();
  city = input<CityTypesFilter>(All_Cities);

  isAllDataLoaded = computed<boolean>(() => this.allDataLoaded() && !!this.apartments().length);

  statisticsByCity = computed<number>(() => {
    const statistics = this.statistics();
    const city = this.city();

    return statistics ? statistics[city] : 0;
  });

  isFavourite(apartment: Apartment): boolean {
    return this.favouritesIds().includes(apartment.id!);
  }
}
