import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { DataService } from '../../../core/services/data.service';

// models
import { Apartment, CityTypesFilter } from '../models';

// rxjs
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// config
import { APP_CONFIG } from '../../../app.config';
import { All_Cities } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService extends DataService {
  readonly #apiUrl: string = inject(APP_CONFIG).apartmentsApiRoot;
  readonly #http = inject(HttpClient);

  constructor() {
    super();
  }
  getApartments(city: CityTypesFilter = All_Cities, page = 1): Observable<Apartment[]> {
    const cityParam = city !== All_Cities ? `address.city=${city}&` : '';
    return this.#http
      .get<Apartment[]>(`${this.#apiUrl}?${cityParam}_page=${page}&_limit=10`)
      .pipe(catchError(this.handleError));
  }

  getApartment(id: string): Observable<Apartment> {
    return this.#http.get<Apartment>(`${this.#apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
}
