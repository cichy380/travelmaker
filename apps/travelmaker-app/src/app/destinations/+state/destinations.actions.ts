import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { DayOfTheWeek, DestinationsEntity } from './destinations.models';
import { ApiErrorResponse } from '../../shared/models/ApiResponse.model';

export const loadDestinations = createAction(
  '[Destinations/API] Load Destinations',
);

export const loadDestinationsSuccess = createAction(
  '[Destinations/API] Load Destinations Success',
  props<{ destinations: DestinationsEntity[] }>()
);

export const loadDestinationsFailure = createAction(
  '[Destinations/API] Load Destinations Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>()
);

export const setSelectedWeekday = createAction(
  '[Destinations] Set Selected Weekday',
  props<{ selectedWeekday: DayOfTheWeek }>(),
);
