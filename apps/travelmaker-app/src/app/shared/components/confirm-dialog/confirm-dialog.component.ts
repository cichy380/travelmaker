import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

export interface ConfirmDialogDataModel {
  title?: string
  message?: string
  btnOk?: string
  btnCancel?: string
}

@Component({
  selector: 'travelmaker-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataModel) {
  }
}
