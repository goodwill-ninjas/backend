import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_setting')
export class UserSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user_: UserEntity;

  @Column({ default: 'default' })
  theme: string;

  @Column({ default: 'standard' })
  font_size: string;

  @Column({ default: true })
  event_notifications: boolean;

  @Column({ default: true })
  reminder_notifications: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
