import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum Weekday {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Entity({ name: 'destinations' })
export class Destination {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  day: Weekday;

  @Column()
  order: number;
}
