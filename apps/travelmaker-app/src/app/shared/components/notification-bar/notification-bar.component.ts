import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'travelmaker-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { text: string },
    public snackBar: MatSnackBar,
  ) {
  }
}
