/**
 * Interface for the 'Destinations' data
 */
export type DestinationId = string;

export interface DestinationsEntity {
  id: DestinationId; // Primary ID
  name: string;
  city: string;
  address: string;
  day: DayOfTheWeek;
  order: number;
}

export enum DayOfTheWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}
