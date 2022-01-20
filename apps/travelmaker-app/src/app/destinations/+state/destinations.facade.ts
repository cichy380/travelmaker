import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as DestinationsActions from './destinations.actions';
import * as DestinationsSelectors from './destinations.selectors';
import { DayOfTheWeek, DestinationsEntity } from './destinations.models';
import { map, Observable, take } from 'rxjs';

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

  constructor(
    private readonly store: Store,
    private actions$: Actions,
  ) { }

  public loadDestinations(): void {
    this.store.dispatch(DestinationsActions.loadDestinations());
  }

  public addDestination(destination: DestinationsEntity): Observable<boolean> {
    this.store.dispatch(DestinationsActions.addDestination({ destination }));
    return this.actions$.pipe(
      ofType(DestinationsActions.addDestinationSuccess, DestinationsActions.addDestinationFailure),
      take(1),
      map((action) => action.type === DestinationsActions.addDestinationSuccess.type)
    );
  }

  public getDestinationsByDay(selectedDay: DayOfTheWeek) {
    return this.store.pipe(
      select(DestinationsSelectors.getDestinationsByDay(selectedDay))
    );
  }

  public setSelectedWeekday(selectedWeekday: DayOfTheWeek): void {
    this.store.dispatch(DestinationsActions.setSelectedWeekday({ selectedWeekday }));
  }
}
