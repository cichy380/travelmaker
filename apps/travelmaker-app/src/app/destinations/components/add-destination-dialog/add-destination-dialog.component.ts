import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { DestinationsEntity } from '../../+state/destinations.models';
import { DaysOfTheWeekSheetComponent } from '../days-of-the-week-sheet/days-of-the-week-sheet.component';


@Component({
  selector: 'travelmaker-add-destination-dialog',
  templateUrl: './add-destination-dialog.component.html',
  styleUrls: ['./add-destination-dialog.component.scss']
})
export class AddDestinationDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AddDestinationDialogComponent>,
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
  ) {
  }

  public onAddDestination = (data: Omit<DestinationsEntity, 'id' | 'order'>) => this.facade.addDestination(data);

  public onWeekdayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onFormSuccessfullySent(): void {
    this.dialogRef.close();
  }
}
