import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DayOfTheWeek, DestinationsEntity } from '../../+state/destinations.models';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DaysOfTheWeekSheetComponent } from '../days-of-the-week-sheet/days-of-the-week-sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'travelmaker-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationAddFormComponent implements OnDestroy {
  public form: FormGroup;
  private subscription = new Subscription();

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
    this.subscription.add(
      this.facade.addDestination({ ...this.form.value, day })
        .subscribe(success => success && this.dialogRef.close())
    );
  }

  onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'travelmaker-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationEditFormComponent implements OnDestroy {
  public form: FormGroup;
  private subscription = new Subscription();

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
    console.log({ ...this.form.value, day });
  }

  onChangeDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
