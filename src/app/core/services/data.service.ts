import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NotFoundError,
  BadInputError,
  NotAuthenticatedError,
  AppError,
  NotAuthorizedError,
  ServiceUnavailableError,
} from '../helpers';

// rxjs
import { throwError } from 'rxjs';

@Injectable()
export class DataService {
  handleError(error: HttpErrorResponse) {
    let mappedError: Error;

    if (Object.prototype.hasOwnProperty.call(error, 'status')) {
      switch (error.status) {
        case 400:
          mappedError = new BadInputError(error);
          break;

        case 401:
          mappedError = new NotAuthenticatedError(error);
          break;

        case 403:
          mappedError = new NotAuthorizedError(error);
          break;

        case 404:
          mappedError = new NotFoundError(error);
          break;

        case 502:
          mappedError = new ServiceUnavailableError();
          break;

        default:
          mappedError = new AppError(error);
      }
    }

    return throwError(() => mappedError ?? error);
  }

  protected toHttpParams(params: Record<string, string | number | boolean>) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  protected deleteParamWithNullValue(params: Record<string, unknown>): Record<string, unknown> {
    return Object.keys(params).reduce(
      (cleanParams, key) => {
        if (params[key] || params[key] === 0) {
          cleanParams[key] = params[key];
        }
        return cleanParams;
      },
      {} as Record<string, unknown>,
    );
  }
}
