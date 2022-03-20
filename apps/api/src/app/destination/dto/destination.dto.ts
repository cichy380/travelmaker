import { Weekday } from '../destination.entity';

export type DestinationId = string;

export class CreateDestinationDto {
  name: string;
  city: string;
  address: string;
  day: Weekday;
  order: number;
}

export class UpdateDestinationDto extends CreateDestinationDto {
  id: DestinationId;
}
