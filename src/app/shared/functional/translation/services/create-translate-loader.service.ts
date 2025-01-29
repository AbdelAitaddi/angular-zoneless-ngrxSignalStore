import { HttpClient } from '@angular/common/http';
import { TranslateLoader, Translation } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// models
import { AppConfig } from '../../../../core/models';

// rxjs
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function createTranslateLoader(http: HttpClient, appConfig: AppConfig) {
  return new NamespacedTranslationLoader(http, appConfig);
}

class NamespacedTranslationLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
  ) {}

  getTranslation(lang: string): Observable<Record<string, string>> {
    const translateLoader = new TranslateHttpLoader(this.http, this.appConfig.translationsApiRoot, '');

    return translateLoader.getTranslation(lang).pipe(
      catchError((error) => {
        console.error('error by loading translation', error);
        const fallBackTranslateLoader = new TranslateHttpLoader(this.http, `/public/i18n/`, '.json');

        return fallBackTranslateLoader.getTranslation(lang);
      }),
      map((translations: Translation) => this.prepareKeys(translations)),
    );
  }

  prepareKeys(translations: Translation): Record<string, string> {
    return Object.keys(translations).reduce(
      (acc, key) => ({
        ...acc,
        ['i18n.' + key]: translations[key],
      }),
      {},
    );
  }
}
