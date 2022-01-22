import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { TranslateWeekdayPipe } from './pipes/translate-weekday.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
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
