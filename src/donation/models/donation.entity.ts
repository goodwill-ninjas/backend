import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('donation')
export class DonationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.donations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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

  @Column({ type: 'timestamp' })
  donated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
