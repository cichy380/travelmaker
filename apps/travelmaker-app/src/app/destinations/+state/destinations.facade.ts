import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as DestinationsActions from './destinations.actions';
import * as DestinationsSelectors from './destinations.selectors';
import { DayOfTheWeek, DestinationId, DestinationsEntity } from './destinations.models';
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
      map((action) => action.type === DestinationsActions.addDestinationSuccess.type),
    );
  }

  public editDestination(destination: DestinationsEntity): Observable<boolean> {
    this.store.dispatch(DestinationsActions.editDestination({ destination }));
    return this.actions$.pipe(
      ofType(DestinationsActions.editDestinationSuccess, DestinationsActions.editDestinationFailure),
      take(1),
      map((action) => action.type === DestinationsActions.editDestinationSuccess.type),
    );
  }

  public deleteDestination(destinationId: DestinationId): Observable<boolean> {
    this.store.dispatch(DestinationsActions.deleteDestination({ destinationId }));
    return this.actions$.pipe(
      ofType(DestinationsActions.deleteDestinationSuccess, DestinationsActions.deleteDestinationFailure),
      take(1),
      map((action) => action.type === DestinationsActions.deleteDestinationSuccess.type),
    );
  }

  public changeOrder(destinationIds: DestinationId[]): Observable<boolean> {
    this.store.dispatch(DestinationsActions.changeOrderDestinations({ destinationIds }));
    return this.actions$.pipe(
      ofType(DestinationsActions.changeOrderDestinationsSuccess, DestinationsActions.changeOrderDestinationsFailure),
      take(1),
      map((action) => action.type === DestinationsActions.changeOrderDestinationsSuccess.type),
    );
  }

  public setSelectedWeekday(selectedWeekday: DayOfTheWeek): void {
    this.store.dispatch(DestinationsActions.setSelectedWeekday({ selectedWeekday }));
  }
}
