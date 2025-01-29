import { Locale } from '../config';

export type LocaleType = (typeof Locale)[keyof typeof Locale];
