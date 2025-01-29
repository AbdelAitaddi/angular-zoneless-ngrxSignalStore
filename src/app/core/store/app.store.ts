import { computed, inject, signal } from '@angular/core';
import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { map } from 'rxjs/operators';

import { BROWSER_LOCATION, STORAGE } from '../../app.config';
import { StorageProvider } from '../models';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Language_Selection_Collection } from '../../shared/functional/translation/config';
import { LanguageSelection } from '../../shared/functional/translation/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { Breakpoints, Icons, nav_List } from '../config';
import { MatDrawerMode } from '@angular/material/sidenav';
import AboutComponent from '../containers/about/about.component';
import ModalComponent from '../../shared/core/components/information-modal/information-modal.components';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _location: inject(BROWSER_LOCATION) as Location,
    _storage: inject(STORAGE) as StorageProvider,
    _breakpointObserver: inject(BreakpointObserver),
    _translate: inject(TranslateService),
    _dialog: inject(MatDialog),
    currentLanguage: signal(inject(TranslateService).currentLang),
    languageCollection: signal(Language_Selection_Collection),
    navList: signal(nav_List),
    icons: signal(Icons),
  })),
  withComputed(({ currentLanguage, _breakpointObserver, languageCollection }) => ({
    currentLanguageItem: computed(() => {
      const selectedLang = languageCollection().find((item: LanguageSelection) => item.code === currentLanguage());
      if (!selectedLang) {
        throw new Error('selected language not completely installed');
      }
      return selectedLang as LanguageSelection;
    }),
    isOpened: toSignal(_breakpointObserver.observe([Breakpoints.smallScreen]).pipe(map((result) => result.matches)), {
      requireSync: true,
    }),
    sidenavMode: toSignal(
      _breakpointObserver
        .observe([Breakpoints.largeScreen])
        .pipe(map((result) => (result.matches ? 'over' : 'side') as MatDrawerMode)),
      { requireSync: true },
    ),
  })),
  withMethods(({ _location, _storage, _dialog }) => ({
    selectLanguage(selectedLang: LanguageSelection): void {
      _storage.localStore.setItem('preferredLanguage', selectedLang.code);
      _location.reload();
    },
    showDialog(): void {
      const dialogConfig: MatDialogConfig<{ component: typeof AboutComponent }> = {
        id: 'about-page',
        autoFocus: false,
        disableClose: true,
        data: { component: AboutComponent },
      };
      _dialog.open(ModalComponent, dialogConfig);
    },
  })),
);
