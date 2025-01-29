import { HttpErrorResponse } from '@angular/common/http';

export class NotAuthenticatedError extends Error {
  constructor(public originalError: HttpErrorResponse) {
    super(originalError.message);
    this.name = NotAuthenticatedError.name;
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  override toString() {
    return this.originalError.message;
  }
}
