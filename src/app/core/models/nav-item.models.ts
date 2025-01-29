import { AppRouteTypes } from './app-route.models';
import { IconTypes } from './icons.models';

export interface NavItem {
  route: AppRouteTypes;
  name: string;
  icon: IconTypes;
  hint: string;
  type: 'navigation' | 'popup';
}
