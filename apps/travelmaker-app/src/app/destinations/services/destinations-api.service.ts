import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DestinationId, DestinationsEntity } from '../+state/destinations.models';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/ApiResponse.model';


@Injectable({
  providedIn: 'root',
})
export class DestinationsApiService {

  constructor(private http: HttpClient) {
  }

  public fetch() {
    return this.http.get<ApiResponse<DestinationsEntity[]>>(`${environment.API_URL}/destinations`);
  }

  public add(destination: Omit<DestinationsEntity, 'id' | 'order'>) {
    return this.http.post<ApiResponse<DestinationsEntity>>(`${environment.API_URL}/destinations`, destination);
  }

  public edit(destination: DestinationsEntity) {
    return this.http.put<ApiResponse<DestinationsEntity>>(`${environment.API_URL}/destinations/${destination.id}`, destination);
  }

  public delete(destinationId: DestinationId) {
    return this.http.delete<ApiResponse<DestinationsEntity>>(`${environment.API_URL}/destinations/${destinationId}`);
  }

  public changeOrder(destinationIds: DestinationId[]) {
    return this.http.patch<ApiResponse<DestinationsEntity[]>>(`${environment.API_URL}/destinations`, { order: destinationIds });
  }
}
