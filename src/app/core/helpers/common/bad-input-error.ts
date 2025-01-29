import { HttpErrorResponse } from '@angular/common/http';

export class BadInputError extends Error {
  constructor(public originalError: HttpErrorResponse) {
    super(originalError.message);
    this.name = BadInputError.name;
    Object.setPrototypeOf(this, BadInputError.prototype);
  }

  override toString() {
    return this.originalError.message;
  }
}
