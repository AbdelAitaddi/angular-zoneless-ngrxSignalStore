import { ChangeDetectionStrategy, Component, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// config
import { BROWSER_LOCATION } from '../../../app.config';

@Component({
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './app-unavailable.component.html',
  styleUrls: ['./app-unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppUnavailableComponent {
  readonly #injector = inject(EnvironmentInjector);

  reload() {
    runInInjectionContext(this.#injector, () => {
      inject(BROWSER_LOCATION).reload();
    });
  }
}
