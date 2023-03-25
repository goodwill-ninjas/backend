import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodCenterEntity } from './blood-center.entity';

@Entity('blood_center_detail')
export class BloodCenterDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BloodCenterEntity, center => center.blood_center_details)
  @JoinColumn({ name: 'blood_center_id' })
  blood_center: BloodCenterEntity;

  @Column()
  blood_type: string;

  @Column()
  capacity: string;

  @CreateDateColumn()
  created_at: Date;
}
