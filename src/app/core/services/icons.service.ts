import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// models
import { IconTypes } from '../models';

// config
import { Icons } from '../config';

// rxjs
import { from, Observable } from 'rxjs';
import { tap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  readonly iconRegistry = inject(MatIconRegistry);
  readonly sanitizer = inject(DomSanitizer);

  registerIcons(): Observable<IconTypes[]> {
    return from(Object.values(Icons)).pipe(
      tap({
        next: (icon) => {
          const iconUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/public/icons/${icon}.svg`);
          this.iconRegistry.addSvgIcon(icon, iconUrl);
        },
      }),
      toArray(),
    );
  }
}
