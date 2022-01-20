import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/ApiResponse.model';
import { DestinationsEntity } from '../+state/destinations.models';


@Injectable({
  providedIn: 'root',
})
export class DestinationsApiService {

  constructor(private http: HttpClient) { }

  public fetch() {
    return this.http.get<ApiResponse<DestinationsEntity[]>>(environment.API_URL + '/destinations');
  }

  public add(destination: DestinationsEntity) {
    return this.http.post<ApiResponse<DestinationsEntity>>(environment.API_URL + '/destinations', destination);
  }
}