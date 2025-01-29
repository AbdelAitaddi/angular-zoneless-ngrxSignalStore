import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// models
import { Apartment } from '../../models';

// pipes

import { App_Route, Icons } from '../../../../core/config';
import { EllipsisPipe, NgxDatePipe } from '../../../../shared/core/pipes';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-apartment-preview',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, EllipsisPipe, NgxDatePipe, TranslatePipe],
  templateUrl: './apartment-preview.component.html',
  styleUrls: ['./apartment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentPreviewComponent {
  apartment = input.required<Apartment>();
  isFavourite = input<boolean, boolean>(false, { transform: booleanAttribute });

  apartmentOverviewRoute = signal(App_Route.apartment_overview);
  Icon_list = signal(Icons);

  $apartmentAddress = computed<string>(() => {
    const {
      address: { streetName, houseNumber, postalCode, city },
    } = this.apartment();
    return `${streetName} ${houseNumber} ${postalCode} ${city}`;
  });

  $totalPrice = computed<string>(() => {
    const {
      details: {
        rent: { totalRent },
      },
      localization: { currency },
    } = this.apartment();
    return `${totalRent} ${currency}`;
  });
}
