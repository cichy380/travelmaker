import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DESTINATIONS_FEATURE_KEY,
  State,
  destinationsAdapter,
} from './destinations.reducer';


// Lookup the 'Destinations' feature state managed by NgRx
export const getDestinationsState = createFeatureSelector<State>(
  DESTINATIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = destinationsAdapter.getSelectors();

export const getDestinationsLoaded = createSelector(
  getDestinationsState,
  (state: State) => state.loaded
);

export const getDestinationsError = createSelector(
  getDestinationsState,
  (state: State) => state.error
);

export const getAllDestinations = createSelector(
  getDestinationsState,
  (state: State) => selectAll(state)
);

export const getDestinationsEntities = createSelector(
  getDestinationsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDestinationsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDestinationsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelectedWeekday = createSelector(
  getDestinationsState,
  (state: State) => state.selectedWeekday,
);
