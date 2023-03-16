import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('donation')
export class DonationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.donations)
  user_: UserEntity;

  @Column({ nullable: true })
  companion_user_id: number;

  @Column()
  donated_type: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  blood_pressure: string;

  @Column({ nullable: true })
  hemoglobin: number;

  @Column({ nullable: true })
  details: string;

  @Column({ type: 'datetime' })
  donated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
