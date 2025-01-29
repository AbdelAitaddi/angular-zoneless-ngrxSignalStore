import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { LanguageSelection } from '../../../shared/functional/translation/models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, TranslatePipe],
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LanguageSelectionComponent {
  currentLanguageItem = input.required<LanguageSelection>();
  languages = input.required({ transform: (languages: LanguageSelection[]) => languages ?? [] });

  selectLanguage = output<LanguageSelection>();
}
