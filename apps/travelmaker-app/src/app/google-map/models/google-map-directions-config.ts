export interface GoogleMapDirectionsConfig {
  travelmode?: GoogleMapDirectionsTravelmode,
}

type GoogleMapDirectionsTravelmode = 'driving' | 'walking' | 'bicycling' | 'transit';
