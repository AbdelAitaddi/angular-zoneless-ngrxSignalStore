import { ErrorHandler, Injectable } from '@angular/core';

import { NotAuthorizedError, NotFoundError, ServiceUnavailableError } from '../helpers';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  private chunkFailedMessage = /Loading chunk [\w]+ failed/;

  constructor() {
    super();
  }

  override handleError(error: string | Error) {
    try {
      super.handleError(error);
    } catch (e) {
      this.reportError(e as Error);
    }
    this.reportError(error);
  }

  reportError(error: string | Error) {
    if (error instanceof ServiceUnavailableError) {
      console.error('Service is unavailable');
    } else if (error instanceof NotAuthorizedError) {
      console.error('Action is not authorized');
    } else if (error instanceof NotFoundError) {
      console.error('endpoint not found');
    } else if (this.chunkFailedMessage.test((error as Error).message)) {
      console.info('New release is available, pleas update now');
    } else {
      console.error('Unknown error', error);
    }
  }
}
