import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodCenterEntity } from './blood-center.entity';

@Entity('blood_center_event')
export class BloodCenterEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

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

  @ManyToOne(() => BloodCenterEntity, center => center.events)
  @JoinColumn({ name: 'blood_center_id' })
  blood_center: BloodCenterEntity;

  @CreateDateColumn()
  created_at: Date;
}
