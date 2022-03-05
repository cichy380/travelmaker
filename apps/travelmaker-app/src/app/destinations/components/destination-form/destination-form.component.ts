import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { Observable } from 'rxjs';


export enum DestinationFormControlName {
   NAME = 'name',
   CITY = 'city',
   ADDRESS = 'address',
}
export type DestinationFormControls = { [formControlName in DestinationFormControlName]: FormControl };
export type DestinationFormData = { [formControlName in DestinationFormControlName]: string };


@Component({
  selector: 'travelmaker-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationFormComponent implements OnInit {
  @Input() submitAction!: () => ((formData: DestinationFormData & { day: DayOfTheWeek }) => Observable<boolean>);
  @Output() successfullySent: EventEmitter<void>;
  @Output() weekdayClick: EventEmitter<void>;

  public form: FormGroup;

  constructor(public facade: DestinationsFacade) {
    this.successfullySent = new EventEmitter<void>();
    this.weekdayClick = new EventEmitter<void>();
    this.form = new FormGroup(this.getFormControls());
  }

  ngOnInit() {
    // form patch here
  }

  private getFormControls(): DestinationFormControls {
    const formControls = {} as DestinationFormControls;
    Object.values(DestinationFormControlName).forEach(formControlName => {
      formControls[formControlName] = new FormControl('');
    })
    return formControls;
  }

  public onSubmit(day: DayOfTheWeek) {
    // this.submit.next(this.form.value);
    console.log(this.submitAction);
    this.submitAction()({ ...this.form.value, day }).subscribe({
      next: formDataSuccessfullySaved =>
        formDataSuccessfullySaved ? this.successfullySent.next() : this.handleFormControlsErrors(),
    });
    // this.facade.addDestination({ ...this.form.value, day }).subscribe({
    //   next: formDataSuccessfulSaved => formDataSuccessfulSaved ? this.dialogRef.close() : this.handleFormControlsErrors(),
    // });
  }

  public onWeekdayClick(): void {
    this.weekdayClick.next();
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

// @Component({
//   selector: 'travelmaker-destination-edit-form',
//   templateUrl: './destination-form.component.html',
//   styleUrls: ['./destination-form.component.scss'],
// })
// export class DestinationEditFormComponent {
//   public form: FormGroup;
//
//   constructor(
//     @Inject(MAT_DIALOG_DATA) private readonly data: { destination: DestinationsEntity },
//     public facade: DestinationsFacade,
//     private bottomSheet: MatBottomSheet,
//     private dialog: MatDialog,
//     private dialogRef: MatDialogRef<DestinationFormComponent>,
//     private formBuilder: FormBuilder,
//   ) {
//     this.form = formBuilder.group(data.destination);
//   }
//
//   public onSubmit(day: DayOfTheWeek) {
//     this.facade.editDestination({ ...this.form.value, day })
//       .subscribe(success => success && this.dialogRef.close());
//   }
//
//   public onChangeDayClick(): void {
//     this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
//   }
//
//   public onDeleteClick() {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '280px',
//       data: ({
//         message: 'You are sure you want to delete this item?',
//       } as ConfirmDialogDataModel),
//       autoFocus: false,
//     });
//
//     dialogRef.afterClosed()
//       .subscribe(result => result && this.facade.deleteDestination(this.data.destination.id)
//         .subscribe(success => success && this.dialogRef.close())
//       );
//   }
// }
