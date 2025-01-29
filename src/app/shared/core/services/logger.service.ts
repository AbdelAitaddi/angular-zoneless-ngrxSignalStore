import { ErrorHandler, inject, Injectable } from '@angular/core';

import { APP_CONFIG } from '../../../app.config';
import { AppConfig } from '../../../core/models';

@Injectable()
export class Logger {
  private readonly appConfig = inject(APP_CONFIG) as AppConfig;
  private readonly errorHandler = inject(ErrorHandler);

  log(value: unknown, ...rest: unknown[]) {
    if (!this.appConfig.production) {
      console.info(value, ...rest);
    }
  }

  error(error: Error) {
    this.errorHandler.handleError(error);
  }

  warn(value: unknown, ...rest: unknown[]) {
    console.warn(value, ...rest);
  }
}
