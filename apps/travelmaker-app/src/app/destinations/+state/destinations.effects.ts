import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as DestinationsActions from './destinations.actions';
import { DestinationsApiService } from '../services/destinations-api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorResponse } from '../../shared/models/ApiResponse.model';

@Injectable()
export class DestinationsEffects {
  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.loadDestinations),
      switchMap(() => this.api.fetch().pipe(
        map((response) => DestinationsActions.loadDestinationsSuccess({ destinations: response.data })),
        catchError((error: HttpErrorResponse | ApiErrorResponse) => of(DestinationsActions.loadDestinationsFailure({ error })))
      ))
    )
  );

  constructor(private readonly actions$: Actions, private api: DestinationsApiService) {
  }
}
