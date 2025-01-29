import { MonoTypeOperatorFunction, Observable, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';

export function ShareReplayLatest<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>): Observable<T> => {
    return source$.pipe(
      share<T>({
        connector: () => new ReplaySubject(1, Infinity),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      }),
    );
  };
}
