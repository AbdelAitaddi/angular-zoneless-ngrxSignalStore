import { Routes } from '@angular/router';

const apartmentsRoutes: Routes = [
  {
    path: '',
    title: 'i18n.core.pageTitle.apartments',
    loadComponent: () => import('./containers/apartment-search/apartment-search.component'),
  },
  {
    path: 'overview/:apartmentId',
    title: 'i18n.core.pageTitle.apartmentDetail',
    loadComponent: () => import('./containers/apartment-overview/apartment-overview.component'),
  },
  {
    path: 'favorites',
    title: 'i18n.core.pageTitle.favourites',
    loadComponent: () => import('./containers/apartment-favorites/apartment-favorites.component'),
  },
];

export default apartmentsRoutes;
