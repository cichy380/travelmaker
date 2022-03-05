import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DayOfTheWeek, DestinationsEntity } from '../../+state/destinations.models';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DaysOfTheWeekSheetComponent } from '../days-of-the-week-sheet/days-of-the-week-sheet.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogDataModel,
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ApiErrorResponseDetails } from '../../../core/models/ApiResponse.model';


@Component({
  selector: 'travelmaker-destination-add-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationAddFormComponent {
  public form: FormGroup;

  constructor(
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<DestinationAddFormComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      name: '',
      city: '',
      address: '',
    });
  }

  public onSubmit(day: DayOfTheWeek) {
    this.facade.addDestination({ ...this.form.value, day }).subscribe({
      next: formDataSuccessfulSaved => formDataSuccessfulSaved ? this.dialogRef.close() : this.handleFormControlsErrors(),
    });
  }

  public onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onDeleteClick() {
    return;
  }

  private handleFormControlsErrors(): void {
    this.facade.error$.subscribe({
      next: error => error?.details && this.setFormControlsErrors(error.details),
    });
  }

  private setFormControlsErrors(formControlErrors: ApiErrorResponseDetails): void {
    Object.entries(formControlErrors).forEach(([formControlName, formControlError]) =>
      this.form.get(formControlName)?.setErrors({ msg: formControlError.message })
    );
  }
}

@Component({
  selector: 'travelmaker-destination-edit-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationEditFormComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { destination: DestinationsEntity },
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DestinationAddFormComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group(data.destination);
  }

  public onSubmit(day: DayOfTheWeek) {
    this.facade.editDestination({ ...this.form.value, day })
      .subscribe(success => success && this.dialogRef.close());
  }

  public onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '280px',
      data: ({
        message: 'You are sure you want to delete this item?',
      } as ConfirmDialogDataModel),
      autoFocus: false,
    });

    dialogRef.afterClosed()
      .subscribe(result => result && this.facade.deleteDestination(this.data.destination.id)
        .subscribe(success => success && this.dialogRef.close())
      );
  }
}
