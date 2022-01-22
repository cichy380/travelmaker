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
      mergeMap(({ updateDestination }) => this.api.edit(updateDestination).pipe(
        map((response) => DestinationsActions.editDestinationSuccess({ updateDestination: { id: response.data.id, changes: response.data } })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.editDestinationFailure({ error }))),
      ))
    )
  );

  constructor(private readonly actions$: Actions, private api: DestinationsApiService) {
  }
}
