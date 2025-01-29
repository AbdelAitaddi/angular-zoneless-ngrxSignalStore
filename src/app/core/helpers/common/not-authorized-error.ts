import { HttpErrorResponse } from '@angular/common/http';

export class NotAuthorizedError extends Error {
  constructor(public originalError: HttpErrorResponse) {
    super(originalError.message);
    this.name = NotAuthorizedError.name;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  override toString() {
    return this.originalError.message;
  }
}
