import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  blood_center_: BloodCenterEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
