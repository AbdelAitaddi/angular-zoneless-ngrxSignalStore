import { App_Route } from './app-route.config';
import { Icons } from './icons.config';

import { NavItem } from '../models';

export const nav_List: NavItem[] = [
  {
    route: App_Route.apartment_search,
    name: 'i18n.core.pageName.menuApartment.label',
    icon: Icons.realEstate,
    hint: 'i18n.core.pageName.menuApartment.hint',
    type: 'navigation',
  },
  {
    route: App_Route.favourites,
    name: 'i18n.core.pageName.menuMyFavourites.label',
    icon: Icons.volunteerActivism,
    hint: 'i18n.core.pageName.menuMyFavourites.hint',
    type: 'navigation',
  },
  {
    route: App_Route.about,
    name: 'i18n.core.pageName.menuAbout.label',
    icon: Icons.info,
    hint: 'i18n.core.pageName.menuAbout.hint',
    type: 'popup',
  },
];
