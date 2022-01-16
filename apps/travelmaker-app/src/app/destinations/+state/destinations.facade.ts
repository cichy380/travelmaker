import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as DestinationsActions from './destinations.actions';
import * as DestinationsSelectors from './destinations.selectors';
import { DayOfTheWeek } from './destinations.models';

@Injectable()
export class DestinationsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DestinationsSelectors.getDestinationsLoaded)
  );
  allDestinations$ = this.store.pipe(
    select(DestinationsSelectors.getAllDestinations)
  );
  selectedDestinations$ = this.store.pipe(
    select(DestinationsSelectors.getSelected)
  );
  selectedWeekday$ = this.store.pipe(
    select(DestinationsSelectors.getSelectedWeekday)
  );

  constructor(private readonly store: Store) {}

  public loadDestinations(): void {
    this.store.dispatch(DestinationsActions.loadDestinations());
  }

  public getDestinationsByDay(selectedDay: DayOfTheWeek) {
    return this.store.pipe(
      select(DestinationsSelectors.getDestinationsByDay(selectedDay))
    )
  }

  public setSelectedWeekday(selectedWeekday: DayOfTheWeek): void {
    this.store.dispatch(DestinationsActions.setSelectedWeekday({selectedWeekday}));
  }
}
