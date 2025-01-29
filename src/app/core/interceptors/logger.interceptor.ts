import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.info(`Request is on its way to ${req.url}`);
  return next(req);
};
