import { HttpErrorResponse } from '@angular/common/http';

export class AppError extends Error {
  public userMessage;

  constructor(public originalError: HttpErrorResponse, userMessage?: string) {
    super(originalError.message);
    this.name = AppError.name;
    Object.setPrototypeOf(this, AppError.prototype);

    if (userMessage) {
      this.userMessage = userMessage;
    }
  }
  override toString() {
    return this.userMessage || this.originalError.message;
  }
}
