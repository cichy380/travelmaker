import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import * as DestinationsActions from './destinations.actions';
import { DestinationsApiService } from '../services/destinations-api.service';
import { ApiErrorResponse } from '../../shared/models/ApiResponse.model';


@Injectable()
export class DestinationsEffects {

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.loadDestinations),
      switchMap(() => this.api.fetch().pipe(
        map((response) => DestinationsActions.loadDestinationsSuccess({ destinations: response.data })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.loadDestinationsFailure({ error }))),
      ))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.addDestination),
      mergeMap(({ destination }) => this.api.add(destination).pipe(
        map((response) => DestinationsActions.addDestinationSuccess({ destination: response.data })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.addDestinationFailure({ error }))),
      ))
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.editDestination),
      mergeMap(({ destination }) => this.api.edit(destination).pipe(
        map((response) => DestinationsActions.editDestinationSuccess({ updateDestination: { id: response.data.id, changes: response.data } })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.editDestinationFailure({ error }))),
      ))
    )
  );

  del$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.deleteDestination),
      mergeMap(({ destinationId }) => this.api.delete(destinationId).pipe(
        map((response) => DestinationsActions.deleteDestinationSuccess({ destinationId: response.data.id })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.deleteDestinationFailure({ error }))),
      ))
    )
  );

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.changeOrderDestinations),
      mergeMap(({ destinationIds }) => this.api.changeOrder(destinationIds).pipe(
        map((response) => DestinationsActions.changeOrderDestinationsSuccess({
          updateDestinations: response.data.map(destination => ({ id: destination.id, changes: destination })),
        })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.changeOrderDestinationsFailure({ error }))),
      ))
    )
  );

  constructor(private readonly actions$: Actions, private api: DestinationsApiService) {
  }
}
