import {
  PreloadAllModules,
  provideRouter,
  Router,
  Routes,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { loggerInterceptor } from './core/interceptors/logger.interceptor';

import { ApartmentsService } from './features/apartments/services/apartments.service';
import { ApartmentHelperService } from './features/apartments/helpers/apartment-helper.service';
import { ApartmentSearchStore } from './features/apartments/store/apartment-search.store';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: () => 'apartments',
    pathMatch: 'full',
  },
  {
    path: 'apartments',
    providers: [
      provideEnvironmentInitializer(() => inject(ApartmentSearchStore).reset()),
      provideHttpClient(withRequestsMadeViaParent(), withInterceptors([loggerInterceptor])),
      importProvidersFrom([ApartmentsService, ApartmentHelperService]),
    ],
    loadChildren: () => import('./features/apartments/apartments.routes'),
    data: {
      name: 'apartments',
    },
  },
  {
    path: 'not-found',
    title: 'i18n.core.pageTitle.pageNotFound',
    loadComponent: () => import('./core/containers/page-not-found/page-not-found.component'),
  },
  {
    path: 'app-unavailable',
    title: 'i18n.core.pageTitle.appUnavailable',
    loadComponent: () => import('./core/containers/app-unavailable/app-unavailable.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./core/containers/page-not-found/page-not-found.component'),
  },
];

export function provideRouterConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withNavigationErrorHandler(() => inject(Router).navigate(['/**'])),
    ),
  ]);
}
