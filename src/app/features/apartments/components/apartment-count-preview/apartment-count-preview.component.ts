import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

// models
import { CityTypesFilter } from '../../models';

// config
import { All_Cities } from '../../config';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

function transformCityFilter(city: CityTypesFilter | undefined): CityTypesFilter {
  return city ?? All_Cities;
}
@Component({
  imports: [UpperCasePipe, TranslatePipe],
  standalone: true,
  selector: 'app-apartment-count-preview',
  templateUrl: './apartment-count-preview.component.html',
  styleUrls: ['./apartment-count-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentCountPreviewComponent {
  apartmentCount = input.required<number | undefined, number>({ transform: numberAttribute });
  statisticByCity = input.required<number | undefined, number>({ transform: numberAttribute });
  showLocation = input.required<boolean, boolean>({ transform: booleanAttribute });
  city = input.required<CityTypesFilter | undefined, CityTypesFilter>({ transform: transformCityFilter });

  $selectedCities = computed<CityTypesFilter | undefined>(() => (this.city() !== All_Cities ? this.city() : undefined));
}
