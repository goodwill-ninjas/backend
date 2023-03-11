import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BloodCenterDetailsEntity as BloodCenterDetails } from './blood-center-details.entity';
import { BloodCenterEventEntity as BloodCenterEvent } from './blood-center-event.entity';

@Entity('blood_centers')
export class BloodCenterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  street_name: string;

  @Column()
  street_number: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  voivodeship: string;
  /* TODO: perhaps custom type for open_from/open_to if
   *  required or something else that's pre-supported?
   *  pipe might handle this anyway l8r
   */

  @Column()
  phone_number: string;

  @Column({ type: 'time' })
  open_from: string;

  @Column({ type: 'time' })
  open_to: string;

  @OneToMany(() => BloodCenterEntity, center => center.id)
  blood_banks: BloodCenterEntity[];

  @OneToMany(() => BloodCenterDetails, details => details.blood_center_)
  blood_center_details: BloodCenterDetails[];

  @OneToMany(() => BloodCenterEvent, event => event.blood_center_)
  events: BloodCenterEvent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
