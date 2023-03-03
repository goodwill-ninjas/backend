import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity as User } from '../../models/user.entity';

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user_: User;

  @Column({ default: 'default' })
  theme: string;

  @Column({ default: 'standard' })
  font_size: number;

  @Column({ default: true })
  event_notifications: boolean;

  @Column({ default: true })
  reminder_notifications: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
