import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayOfTheWeek, DestinationsEntity } from '../../+state/destinations.models';
import { DestinationsFacade } from '../../+state/destinations.facade';
import { ApiErrorResponseDetails } from '../../../core/models/ApiResponse.model';


export enum DestinationFormControlName {
   NAME = 'name',
   CITY = 'city',
   ADDRESS = 'address',
}
export type DestinationFormControls = { [formControlName in DestinationFormControlName]: FormControl };


@Component({
  selector: 'travelmaker-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
})
export class DestinationFormComponent implements OnInit {
  @Input() values: DestinationsEntity = {} as DestinationsEntity;
  @Input() submitAction!: (destinationData: DestinationsEntity) => Observable<boolean>;
  @Output() successfullySent: EventEmitter<void>;
  @Output() weekdayClick: EventEmitter<void>;

  public form!: FormGroup;

  constructor(public facade: DestinationsFacade) {
    this.successfullySent = new EventEmitter<void>();
    this.weekdayClick = new EventEmitter<void>();
  }

  ngOnInit() {
    this.form = new FormGroup(this.getFormControls());
  }

  private getFormControls(): DestinationFormControls {
    const formControls = {} as DestinationFormControls;
    Object.entries({...convertEnumToObject(DestinationFormControlName), ...this.values})
      .forEach(([formControlName, formControlValue]) => {
        formControls[formControlName as DestinationFormControlName] = new FormControl(formControlValue);
      })
    return formControls;
  }

  public onSubmit(day: DayOfTheWeek) {
    this.submitAction({ ...this.form.value, day }).subscribe({
      next: formDataSuccessfullySaved =>
        formDataSuccessfullySaved ? this.successfullySent.next() : this.handleFormControlsErrors(),
    });
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
    Object.entries(formControlErrors).forEach(([formControlName, formControlErrorMessage]) =>
      this.form.get(formControlName)?.setErrors({ msg: formControlErrorMessage })
    );
  }
}

function convertEnumToObject(input: { [key in string]: string }) {
  const output = {} as { [key in string]: string };
  Object.values(input).forEach((propName) => {
    output[propName] = '';
  })
  return output;
}
