import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { AppRouteTypes } from '../../models';

function AppRouteAttributeTransformer(route: AppRouteTypes): AppRouteTypes {
  return route ?? '/';
}

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [MatListModule, MatLineModule, MatIconModule, RouterModule, TranslatePipe],
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavItemComponent {
  hint = input<string>('');
  name = input.required<string>();
  icon = input.required<string>();
  type = input.required<'navigation' | 'popup'>();
  route = input.required({ transform: AppRouteAttributeTransformer });

  itemClicked = output<'navigation' | 'popup'>();

  navigate($event) {
    $event.stopPropagation();
    this.itemClicked.emit(this.type());
  }
}
