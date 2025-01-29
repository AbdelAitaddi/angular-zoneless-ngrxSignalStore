import { HttpErrorResponse } from '@angular/common/http';

export class NotFoundError extends Error {
  constructor(public originalError: HttpErrorResponse) {
    super(originalError.message);
    this.name = NotFoundError.name;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  override toString() {
    return this.originalError.message;
  }
}
