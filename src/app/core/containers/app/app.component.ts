import { TranslatePipe } from '@ngx-translate/core';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  untracked,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialogModule } from '@angular/material/dialog';

// components
import LanguageSelectionComponent from '../../components/language-selection/language-selection.component';
import NavItemComponent from '../../components/nav-item/nav-item.component';

import { NavItem } from '../../models';
import { LanguageSelection } from '../../../shared/functional/translation/models';

// config
import { AppStore } from '../../store/app.store';
import { IconTypes } from '../../config';

interface ViewModel {
  icons: IconTypes;
  navList: NavItem[];
  languageCollection: LanguageSelection[];
  currentLanguageItem: LanguageSelection;
  isOpened: boolean;
  sidenavMode: MatDrawerMode;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatLineModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    NavItemComponent,
    LanguageSelectionComponent,
    MatDialogModule,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppComponent {
  readonly #document = inject(DOCUMENT) as Document;
  readonly #appStore = inject(AppStore);

  readonly viewModel: Signal<ViewModel> = computed(() => ({
    icons: this.#appStore.icons(),
    navList: this.#appStore.navList(),
    languageCollection: this.#appStore.languageCollection(),
    currentLanguageItem: this.#appStore.currentLanguageItem(),
    isOpened: this.#appStore.isOpened(),
    sidenavMode: this.#appStore.sidenavMode(),
  }));

  constructor() {
    afterNextRender({
      write: () => {
        untracked(() => {
          this.#document.documentElement.lang = this.#appStore.currentLanguage();
        });
      },
    });
  }

  selectLanguage(selectedLang: LanguageSelection) {
    this.#appStore.selectLanguage(selectedLang);
  }

  onItemClicked(event: 'navigation' | 'popup') {
    if (event === 'popup') {
      this.#appStore.showDialog();
    }
  }
}
