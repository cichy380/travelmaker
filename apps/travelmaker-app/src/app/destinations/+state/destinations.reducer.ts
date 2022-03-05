import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiErrorResponse } from '../../core/models/ApiResponse.model';
import * as DestinationsActions from './destinations.actions';
import { DayOfTheWeek, DestinationId, DestinationsEntity } from './destinations.models';

export const DESTINATIONS_FEATURE_KEY = 'destinations';

export interface State extends EntityState<DestinationsEntity> {
  selectedId?: DestinationId;
  loaded: boolean;
  error?: ApiErrorResponse | null;
  selectedWeekday: DayOfTheWeek;
}

export interface DestinationsPartialState {
  readonly [DESTINATIONS_FEATURE_KEY]: State;
}

export const destinationsAdapter: EntityAdapter<DestinationsEntity> = createEntityAdapter<DestinationsEntity>({
  sortComparer: (a: DestinationsEntity, b: DestinationsEntity) => a.order > b.order ? 1 : -1
});

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
    destinationsAdapter.setOne(destination, { ...state })
  ),
  on(DestinationsActions.addDestinationFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.editDestinationSuccess, (state, { updateDestination }) =>
    destinationsAdapter.updateOne(updateDestination, { ...state })
  ),
  on(DestinationsActions.editDestinationFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.deleteDestinationSuccess, (state, { destinationId }) =>
    destinationsAdapter.removeOne(destinationId, { ...state })
  ),
  on(DestinationsActions.deleteDestinationFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.changeOrderDestinationsSuccess, (state, { updateDestinations }) =>
    destinationsAdapter.updateMany(updateDestinations, { ...state })
  ),
  on(DestinationsActions.changeOrderDestinationsFailure, (state, { error }) => ({ ...state, error })),

  on(DestinationsActions.setSelectedWeekday, (state, { selectedWeekday }) => ({ ...state, selectedWeekday })),
);

export function reducer(state: State | undefined, action: Action) {
  return destinationsReducer(state, action);
}

function getCurrentWeekday(): DayOfTheWeek {
  return Object.values(DayOfTheWeek)[(new Date()).getDay()];
}
