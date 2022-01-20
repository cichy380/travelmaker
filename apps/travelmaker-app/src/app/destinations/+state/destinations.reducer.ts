import { HttpErrorResponse } from '@angular/common/http';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiErrorResponse } from '../../shared/models/ApiResponse.model';
import * as DestinationsActions from './destinations.actions';
import { DayOfTheWeek, DestinationsEntity } from './destinations.models';

export const DESTINATIONS_FEATURE_KEY = 'destinations';

export interface State extends EntityState<DestinationsEntity> {
  selectedId?: string | number; // which Destinations record has been selected
  loaded: boolean; // has the Destinations list been loaded
  error?: HttpErrorResponse | ApiErrorResponse | null;
  selectedWeekday: DayOfTheWeek;
}

export interface DestinationsPartialState {
  readonly [DESTINATIONS_FEATURE_KEY]: State;
}

export const destinationsAdapter: EntityAdapter<DestinationsEntity> =
  createEntityAdapter<DestinationsEntity>();

export const initialState: State = destinationsAdapter.getInitialState({
  loaded: false,
  selectedWeekday: getCurrentWeekday(),
});

const destinationsReducer = createReducer(
  initialState,
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) =>
    destinationsAdapter.setAll(destinations, { ...state, loaded: true })
  ),
  on(DestinationsActions.loadDestinationsFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.addDestinationSuccess, (state, { destination }) =>
    destinationsAdapter.setOne(destination, { ...state, loaded: true })
  ),
  on(DestinationsActions.addDestinationFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.setSelectedWeekday, (state, { selectedWeekday }) => ({
    ...state,
    selectedWeekday,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return destinationsReducer(state, action);
}

function getCurrentWeekday(): DayOfTheWeek {
  return Object.values(DayOfTheWeek)[(new Date()).getDay()];
}
