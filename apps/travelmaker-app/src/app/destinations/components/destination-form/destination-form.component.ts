import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DayOfTheWeek, DestinationsEntity } from '../../+state/destinations.models';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DaysOfTheWeekSheetComponent } from '../days-of-the-week-sheet/days-of-the-week-sheet.component';


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
    this.facade.addDestination({ ...this.form.value, day })
      .subscribe(success => success && this.dialogRef.close());
  }

  onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
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
    private dialogRef: MatDialogRef<DestinationAddFormComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group(data.destination);
  }

  public onSubmit(day: DayOfTheWeek) {
    this.facade.editDestination({ ...this.form.value, day })
      .subscribe(success => success && this.dialogRef.close());
  }

  onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }
}
