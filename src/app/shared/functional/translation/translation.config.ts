import { MissingTranslationHandler, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { Language_Selection_Collection } from './config';
import { APP_CONFIG, STORAGE } from '../../../app.config';

import { LanguageSelection, LocaleType } from './models';
import { AppConfig, StorageProvider } from '../../../core/models';

import { MyMissingTranslationHandler } from './services/mssing-translation-handler.service';
import { createTranslateLoader } from './services/create-translate-loader.service';

// prevents untranslated text in the UI
export function setLanguage() {
  const appConfig: AppConfig = inject(APP_CONFIG);
  const storage: StorageProvider = inject(STORAGE);
  const translate: TranslateService = inject(TranslateService);

  const preferredLanguage = storage.localStore.getItem('preferredLanguage') as LocaleType;

  const languageSelection = Language_Selection_Collection.find(
    (item: LanguageSelection) => item.code === preferredLanguage,
  );

  const localeId = languageSelection?.code ?? appConfig.defaultLanguage;
  return translate.use(localeId);
}

export const provideTranslateConfig = () => ({
  isolate: false,
  useDefaultLang: false,
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: MyMissingTranslationHandler,
  },
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient, APP_CONFIG],
  },
});
