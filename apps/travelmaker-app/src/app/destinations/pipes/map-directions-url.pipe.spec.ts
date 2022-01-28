import { MapDirectionsUrlPipe } from './map-directions-url.pipe';
import { GoogleMapService } from '../../google-map/services/google-map.service';
import { DayOfTheWeek, DestinationsEntity } from '../+state/destinations.models';

describe('MapDirectionsUrlPipe', () => {
  let pipe: MapDirectionsUrlPipe;
  const emptyDestination: DestinationsEntity = {
    id: '',
    name: '',
    city: '',
    address: '',
    day: DayOfTheWeek.MONDAY,
    order: 0,
  };

  beforeAll(() => {
    pipe = new MapDirectionsUrlPipe(new GoogleMapService());
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    // given
    const destinations: DestinationsEntity[] = [{
      ...emptyDestination,
      city: 'Pabianice',
      address: 'Warszawska 123',
    }, {
      ...emptyDestination,
      city: 'Warszawa',
      address: 'Pabianicka 321',
    }];

    expect(pipe.transform(destinations))
      .toEqual('https://www.google.com/maps/dir/?api=1&waypoints=Warszawska+123,+Pabianice&destination=Pabianicka+321,+Warszawa&travelmode=driving&dir_action=navigate');
  });
});
