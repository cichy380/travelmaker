import { Pipe, PipeTransform } from '@angular/core';
import { DestinationsEntity } from '../+state/destinations.models';
import { MapService } from '../../shared/services/map.service';

@Pipe({
  name: 'mapDirectionsUrl',
})
export class MapDirectionsUrlPipe implements PipeTransform {

  constructor(private mapService: MapService) {
  }

  transform(destinations: DestinationsEntity[] | null): string {
    if (!destinations) {
      return '#';
    }

    return this.mapService.getMapDirectionsUrl(
      destinations.map(destination => ({ city: destination.city, street: destination.address }))
    );
  }

}
