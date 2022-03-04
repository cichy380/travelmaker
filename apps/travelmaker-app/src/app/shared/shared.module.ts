import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { TranslateWeekdayPipe } from './pipes/translate-weekday.pipe';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NotificationBarComponent,
    TranslateWeekdayPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    ConfirmDialogComponent,
    TranslateWeekdayPipe,
  ],
})
export class SharedModule { }
