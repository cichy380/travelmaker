import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { DayOfTheWeek, DestinationId, DestinationsEntity } from './destinations.models';
import { ApiErrorResponse } from '../../core/models/ApiResponse.model';


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
  props<{ destination: Omit<DestinationsEntity, 'id' | 'order'> }>(),
);

export const addDestinationSuccess = createAction(
  '[Destinations/API] Add Destination Success',
  props<{ destination: DestinationsEntity }>(),
);

export const addDestinationFailure = createAction(
  '[Destinations/API] Add Destination Failure',
  props<{ error: ApiErrorResponse }>(),
);


export const editDestination = createAction(
  '[Destinations/API] Edit Destination',
  props<{ destination: DestinationsEntity }>(),
);

export const editDestinationSuccess = createAction(
  '[Destinations/API] Edit Destination Success',
  props<{ updateDestination: Update<DestinationsEntity> }>(),
);

export const editDestinationFailure = createAction(
  '[Destinations/API] Edit Destination Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const deleteDestination = createAction(
  '[Destinations/API] Delete Destination',
  props<{ destinationId: DestinationId }>(),
);

export const deleteDestinationSuccess = createAction(
  '[Destinations/API] Delete Destination Success',
  props<{ destinationId: DestinationId }>(),
);

export const deleteDestinationFailure = createAction(
  '[Destinations/API] Delete Destination Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const changeOrderDestinations = createAction(
  '[Destinations/API] Change Order of Destinations',
  props<{ destinationIds: DestinationId[] }>(),
);

export const changeOrderDestinationsSuccess = createAction(
  '[Destinations/API] Change Order of Destinations Success',
  props<{ updateDestinations: Update<DestinationsEntity>[] }>(),
);

export const changeOrderDestinationsFailure = createAction(
  '[Destinations/API] Change Order of Destinations Failure',
  props<{ error: HttpErrorResponse | ApiErrorResponse }>(),
);


export const setSelectedWeekday = createAction(
  '[Destinations] Set Selected Weekday',
  props<{ selectedWeekday: DayOfTheWeek }>(),
);
