import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blood_centers')
export class BloodCenterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  street_name: string;

  @Column()
  street_number: number;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  voivodeship: string;

  @Column({ type: 'time' })
  /* TODO: perhaps custom type if required or something pre-supported?
   *     pipe might handle this anyway l8r
   */
  open_from: string;

  @Column({ type: 'time' })
  open_to: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
