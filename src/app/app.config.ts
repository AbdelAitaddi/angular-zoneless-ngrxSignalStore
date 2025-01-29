import { APP_BASE_HREF, IMAGE_CONFIG, LocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import {
  importProvidersFrom,
  ApplicationConfig,
  makeEnvironmentProviders,
  EnvironmentProviders,
  InjectionToken,
  LOCALE_ID,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// services
import { IconsService } from './core/services/icons.service';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { GlobalLoadingIndicatorService } from './core/services/global-loading-indicator.service';
import { TemplatePageTitleStrategy } from './core/services/template-page-title-strategy.service';

// routes
import { provideRouterConfig } from './app.routes';

// models
import { AppConfig, StorageProvider } from './core/models';
import { provideTranslateConfig, setLanguage } from './shared/functional/translation/translation.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Tokens
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const WINDOW = new InjectionToken<Window>('window');
export const BROWSER_LOCATION = new InjectionToken<Location>('window location');
export const STORAGE = new InjectionToken<StorageProvider>('storageObject');

export const appConfig = (config: AppConfig): ApplicationConfig => ({
  providers: [
    provideAnimationsAsync(), // You can disable animations by providing 'noop' as the value of provideAnimationsAsync()
    provideHttpClient(withInterceptors([])),
    provideTranslateService(provideTranslateConfig()),
    importProvidersFrom([IconsService, GlobalLoadingIndicatorService]),
    AppEnvironmentProviders(config),
    provideRouterConfig(),
    provideExperimentalZonelessChangeDetection(),
  ],
});

export function AppEnvironmentProviders(config: AppConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_CONFIG,
      useValue: config,
    },
    provideAppInitializer(() => inject(IconsService).registerIcons()),
    provideAppInitializer(() => setLanguage()),
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation],
    },
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => translate.currentLang,
      deps: [TranslateService],
    },
    {
      provide: BROWSER_LOCATION,
      useFactory: () => window.location,
    },
    {
      provide: STORAGE,
      useFactory: (): StorageProvider => ({ localStore: localStorage, sessionStore: sessionStorage }),
    },
    {
      provide: WINDOW,
      useFactory: () => window,
    },
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: false,
        disableImageLazyLoadWarning: false,
      },
    },
  ]);
}
