import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { DestinationsEntity } from '../../+state/destinations.models';
import { DaysOfTheWeekSheetComponent } from '../days-of-the-week-sheet/days-of-the-week-sheet.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogDataModel
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'travelmaker-edit-destination-dialog',
  templateUrl: './edit-destination-dialog.component.html',
  styleUrls: ['./edit-destination-dialog.component.scss']
})
export class EditDestinationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { destination: DestinationsEntity },
    private dialogRef: MatDialogRef<EditDestinationDialogComponent>,
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
  ) { }

  public onEditDestination = (data: DestinationsEntity) => this.facade.editDestination(data);

  public onWeekdayClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onFormSuccessfullySent(): void {
    this.dialogRef.close();
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
