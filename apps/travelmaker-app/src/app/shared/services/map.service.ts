import { Injectable } from '@angular/core';

export interface MapAddress {
  city: string,
  street: string,
}

@Injectable({
  providedIn: 'root',
})
export abstract class MapService {

  abstract getMapDirectionsUrl(addressPoints: MapAddress[]): string;
}
