import { Weekday } from '../destination.entity';

export class CreateDestinationDto {
  name: string;
  city: string;
  address: string;
  day: Weekday;
  order: number;
}
