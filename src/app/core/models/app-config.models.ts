import { LocaleType } from '../../shared/functional/translation/models';

export interface AppConfig {
  production: boolean;
  apartmentsApiRoot: string;
  translationsApiRoot: string;
  statistics: string;
  defaultLanguage: LocaleType;
  envName: string;
}
