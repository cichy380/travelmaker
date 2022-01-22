import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { DestinationsEntity } from '../+state/destinations.models';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/ApiResponse.model';


@Injectable({
  providedIn: 'root',
})
export class DestinationsApiService {

  constructor(private http: HttpClient) { }

  public fetch() {
    return this.http.get<ApiResponse<DestinationsEntity[]>>(`${environment.API_URL}/destinations`);
  }

  public add(destination: Omit<DestinationsEntity, 'id'>) {
    return this.http.post<ApiResponse<DestinationsEntity>>(`${environment.API_URL}/destinations`, destination);
  }

  public edit(update: Update<DestinationsEntity>) {
    return this.http.put<ApiResponse<DestinationsEntity>>(`${environment.API_URL}/destinations/${update.id}`, update.changes);
  }
}
