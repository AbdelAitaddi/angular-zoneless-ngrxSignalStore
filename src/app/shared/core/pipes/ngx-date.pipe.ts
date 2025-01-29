import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export type formats = 'userLocalDate' | 'utcDate' | 'dateTime' | 'shortTime' | 'year' | 'month' | 'shortDate';

/**
 *
  ‘medium’:     equivalent to ‘yMMMdjms’ (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
  ‘short’:      equivalent to ‘yMdjm’ (e.g. 9/3/2010, 12:05 PM for en-US)
  ‘fullDate’:   equivalent to ‘yMMMMEEEEd’ (e.g. Friday, September 3, 2010 for en-US)
  ‘longDate’:   equivalent to ‘yMMMMd’ (e.g. September 3, 2010 for en-US)
  ‘mediumDate’: equivalent to ‘yMMMd’ (e.g. Sep 3, 2010 for en-US)
  ‘shortDate’:  equivalent to ‘yMd’ (e.g. 9/3/2010 for en-US)
  ‘mediumTime’: equivalent to ‘jms’ (e.g. 12:05:08 PM for en-US)
  ‘shortTime’:  equivalent to ‘jm’ (e.g. 12:05 PM for en-US)
**/
@Pipe({
  name: 'ngxDate',
  standalone: true,
})
export class NgxDatePipe extends DatePipe implements PipeTransform {
  override transform(value: Date | string | number, format: formats): string | null;
  override transform(value: null | undefined, format: formats): null;
  override transform(value: Date | string | number | null | undefined, format: formats): string | null;
  override transform(value: Date | string | number | null | undefined, format: formats): string | null {
    if (!value) {
      return null;
    }

    switch (format) {
      case 'utcDate':
        // we force the date to be rendered as UTC regardless of the user's timezone
        return this.isDateOnlyString(value)
          ? super.transform(`${value}T00:00:00.000Z`, 'shortDate', 'UTC+0')
          : super.transform(value, 'shortDate', 'UTC+0');
      case 'shortDate':
        return super.transform(value, 'shortDate');
      case 'userLocalDate':
        return this.isDateOnlyString(value)
          ? super.transform(`${value}T00:00:00.000Z`, 'shortDate', 'UTC+0')
          : super.transform(value, 'shortDate');
      case 'dateTime':
        return super.transform(value, 'short');
      case 'shortTime':
        return super.transform(value, 'shortTime');
      case 'year':
        return super.transform(value, 'yyyy');
      case 'month':
        return super.transform(value, 'MMMM');
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }

  private isDateOnlyString(value: string | Date | number): boolean {
    return typeof value === 'string' && !!value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
  }
}
