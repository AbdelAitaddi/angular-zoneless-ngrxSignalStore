import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// models
import { Apartment } from '../../models';
import { Icons } from '../../../../core/config';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-apartment-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentItemComponent {
  apartment = input.required<Apartment>();
  selected = input(false, { transform: booleanAttribute });

  save = output<Apartment>();
  remove = output<Apartment>();
  back = output<void>();

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

  $rentDetailInfo = computed<string>(() => {
    const {
      details: {
        rent: { baseRent, operationalCosts },
      },
    } = this.apartment();
    return `baseRent: ${baseRent} +  operational Costs: ${operationalCosts}`;
  });

  toggleFavourite(apartment: Apartment) {
    if (this.selected()) {
      this.remove.emit(apartment);
    } else {
      this.save.emit(apartment);
    }
  }
}
