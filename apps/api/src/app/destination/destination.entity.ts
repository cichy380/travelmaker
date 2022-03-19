import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export type Weekday = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

@Entity({ name: 'destinations'})
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
