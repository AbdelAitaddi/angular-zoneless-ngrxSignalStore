import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  readonly title = inject(Title);
  readonly translation = inject(TranslateService);

  override updateTitle(routerState: RouterStateSnapshot) {
    const portalTitleKey = this.translation.instant('i18n.core.portalTitle.ApartmentSearch');
    const pageTitleKey = this.buildTitle(routerState);

    this.title.setTitle(
      pageTitleKey ? `${this.translation.instant(pageTitleKey)} - ${portalTitleKey}` : portalTitleKey
    );
  }

  constructor() {
    super();
  }
}
