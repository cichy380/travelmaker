import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { DayOfTheWeek, DestinationsEntity } from './destinations.models';
import { ApiErrorResponse } from '../../shared/models/ApiResponse.model';


export const loadDestinations = createAction(
  '[Destinations/API] Load Destinations',
);

export const loadDestinationsSuccess = createAction(
  '[Destinations/API] Load Destinations Success',
  props<{ destinations: DestinationsEntity[] }>(),
);

export const loadDestinationsFailure = createAction(
  '[Destinations/API] Load Destinations Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const addDestination = createAction(
  '[Destinations/API] Add Destination',
  props<{ destination: DestinationsEntity }>(),
);

export const addDestinationSuccess = createAction(
  '[Destinations/API] Add Destination Success',
  props<{ destination: DestinationsEntity }>(),
);

export const addDestinationFailure = createAction(
  '[Destinations/API] Add Destination Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const editDestination = createAction(
  '[Destinations/API] Edit Destination',
  props<{ updateDestination: Update<DestinationsEntity> }>(),
);

export const editDestinationSuccess = createAction(
  '[Destinations/API] Edit Destination Success',
  props<{ updateDestination: Update<DestinationsEntity> }>(),
);

export const editDestinationFailure = createAction(
  '[Destinations/API] Edit Destination Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const setSelectedWeekday = createAction(
  '[Destinations] Set Selected Weekday',
  props<{ selectedWeekday: DayOfTheWeek }>(),
);
