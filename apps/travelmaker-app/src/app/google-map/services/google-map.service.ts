import { Injectable } from '@angular/core';
import { MapAddress, MapService } from '../../shared/services/map.service';
import { GoogleMapDirectionsConfig } from '../models/google-map-directions-config';

const DIRECTIONS_CONFIG: GoogleMapDirectionsConfig = {
  travelmode: 'driving',
}

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService implements MapService {

  // Google Maps URLs
  // Directions: https://developers.google.com/maps/documentation/urls/get-started#directions-action
  public getMapDirectionsUrl(addressPoints: MapAddress[]): string {
    const pointsEncoded = addressPoints.map(point => encodeUrl(`${point.street}, ${point.city}`));
    const destination = pointsEncoded.pop() as string; // last point must be the destination of travel
    const waypoints = pointsEncoded;

    const parameters: string[] = [];
    parameters.push(`waypoints=${waypoints.join('|')}`);
    parameters.push(`destination=${destination}`);
    parameters.push(`travelmode=${DIRECTIONS_CONFIG.travelmode}`);
    parameters.push(`dir_action=navigate`);

    return `https://www.google.com/maps/dir/?api=1&${parameters.join('&')}`;
  }
}

function encodeUrl(url: string): string {
  return encodeURIComponent(url)
    .replace(/%20/g, '+')
    .replace(/%2C/g, ',');
}
