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
export class DestinationFormComponent implements OnDestroy {
  public form: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<DestinationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: {
      addingForm?: boolean,
      day: DayOfTheWeek,
    },
  ) {
    const formControlsConfig: Partial<DestinationsEntity> = {
      name: '',
      city: '',
      address: '',
      day: data.day,
    }

    this.form = formBuilder.group(formControlsConfig);
  }

  public onSubmit() {
    if (this.form.valid) {
      this.subscription.add(
        this.facade.addDestination(this.form.value)
          .subscribe(success => success && this.dialogRef.close())
      );
    }
  }

  onDayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
