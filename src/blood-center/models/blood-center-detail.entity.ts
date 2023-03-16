import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BloodCenterEntity } from './blood-center.entity';

@Entity('blood_center_detail')
export class BloodCenterDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BloodCenterEntity, center => center.blood_center_details)
  blood_center_: BloodCenterEntity;

  @Column()
  blood_type: string;

  @Column()
  capacity: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
