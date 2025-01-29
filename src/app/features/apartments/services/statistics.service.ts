import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { DataService } from '../../../core/services/data.service';

// config
import { APP_CONFIG } from '../../../app.config';

// models
import { Statistics } from '../models';
import { AppConfig } from '../../../core/models';

// rxjs
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService extends DataService {
  #http = inject(HttpClient);
  #appConfig = inject(APP_CONFIG) as AppConfig;

  constructor() {
    super();
  }

  getStatistics(): Observable<Statistics> {
    return this.#http.get<Statistics>(this.#appConfig.statistics).pipe(catchError(this.handleError));
  }
}
