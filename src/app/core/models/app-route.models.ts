import { App_Route } from '../config';

export type AppRouteTypes = (typeof App_Route)[keyof typeof App_Route];
