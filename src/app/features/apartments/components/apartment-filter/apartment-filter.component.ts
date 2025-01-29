import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CityTypes, CityTypesFilter } from '../../models';

// rxjs

import { All_Cities } from '../../config';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-apartment-filter',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './apartment-filter.component.html',
  styleUrls: ['./apartment-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApartmentFilterComponent {
  city = model<CityTypesFilter>(All_Cities);
  borough = model<string | typeof All_Cities>(All_Cities);

  boroughs = input([], { transform: (boroughs: string[]) => boroughs ?? [] });
  cities = input([], { transform: (cities: CityTypes[] | undefined) => cities ?? [] });

  onCityChange(city: CityTypesFilter) {
    this.city.set(city);
  }

  onBoroughChange(borough: string | typeof All_Cities) {
    this.borough.set(borough);
  }
}
