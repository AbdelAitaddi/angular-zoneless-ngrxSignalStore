import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

@Component({
  imports: [NgComponentOutlet, MatIconModule, MatButtonModule, MatDialogModule, RouterModule],
  standalone: true,
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModalComponent {
  readonly data = inject(MAT_DIALOG_DATA);
}
