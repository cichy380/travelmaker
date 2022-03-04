import { Injectable, NgZone } from '@angular/core'
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar'
import { NotificationBarComponent } from './notification-bar.component'

const defaultSnackBarConfig: MatSnackBarConfig = {
  duration: 2000,
  verticalPosition: 'top',
}

const successSnackBarConfig: MatSnackBarConfig = {
  ...defaultSnackBarConfig,
  announcementMessage: 'Success.',
  panelClass: ['notification-bar--success'],
}

const errorSnackBarConfig: MatSnackBarConfig = {
  ...defaultSnackBarConfig,
  duration: 20000,
  announcementMessage: 'An unknown error occurred.',
  panelClass: ['notification-bar--error'],
}

export type NotificationBarRef = MatSnackBarRef<NotificationBarComponent>


@Injectable({
  providedIn: 'root',
})
export class NotificationBarService {
  private openedNotificationBarRef!: NotificationBarRef

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {
  }

  public showInfo = (message: string, duration?: number): NotificationBarRef => this.show(defaultSnackBarConfig, message, duration)
  public showSuccess = (message: string, duration?: number): NotificationBarRef => this.show(successSnackBarConfig, message, duration)
  public showError = (message: string, duration?: number): NotificationBarRef => this.show(errorSnackBarConfig, message, duration)

  private show(defaultConfig: MatSnackBarConfig, message: string, duration?: number): NotificationBarRef {
    const snackBarConfig: MatSnackBarConfig = duration ? {...defaultConfig, duration} : defaultConfig

    if (message) {
      this.zone.run(() => this.openedNotificationBarRef = this.snackBar.openFromComponent(NotificationBarComponent, {
        ...snackBarConfig,
        data: {text: message},
      }))
    }
    return this.openedNotificationBarRef
  }

  public dismiss(snackBarRef?: NotificationBarRef): void {
    if (snackBarRef) {
      snackBarRef.dismiss()
    } else if (this.openedNotificationBarRef) {
      this.openedNotificationBarRef.dismiss()
    }
  }
}
