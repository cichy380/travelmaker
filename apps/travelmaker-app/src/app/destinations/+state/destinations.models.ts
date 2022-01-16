/**
 * Interface for the 'Destinations' data
 */
export interface DestinationsEntity {
  id: string; // Primary ID
  name: string;
  city: string;
  address: string;
  day: DayOfTheWeek;
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
