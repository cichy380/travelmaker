import { Pipe, PipeTransform } from '@angular/core';
import { DayOfTheWeek, DestinationsEntity } from '../+state/destinations.models';

@Pipe({
  name: 'destinationsByDay',
})
export class DestinationsByDayPipe implements PipeTransform {

  transform(destinations: DestinationsEntity[] | null, day: DayOfTheWeek): DestinationsEntity[] | null {
    if (!destinations) {
      return destinations;
    }

    return destinations.filter(i => i.day === day);
  }

}
