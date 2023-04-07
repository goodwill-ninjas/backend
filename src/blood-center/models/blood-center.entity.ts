import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodCenterDetailEntity as BloodCenterDetails } from './blood-center-detail.entity';
import { BloodCenterEventEntity as BloodCenterEvent } from './blood-center-event.entity';

@Entity('blood_center')
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

  @Column()
  geo_coordinates: string;

  @Column()
  phone_number: string;

  @Column({ type: 'timestamp with time zone' })
  open_from: Date;

  @Column({ type: 'timestamp with time zone' })
  open_to: Date;

  @OneToMany(() => BloodCenterEntity, center => center.id)
  blood_banks: BloodCenterEntity[];

  @OneToMany(() => BloodCenterDetails, details => details.blood_center)
  blood_center_details: BloodCenterDetails[];

  @OneToMany(() => BloodCenterEvent, event => event.blood_center)
  events: BloodCenterEvent[];

  @CreateDateColumn()
  created_at: Date;
}
