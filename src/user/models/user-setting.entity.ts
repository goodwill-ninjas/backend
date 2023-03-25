import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_setting')
export class UserSettingEntity {
  @ApiProperty({
    description: 'Primary key as User Settings ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, user => user.settings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    description: 'Chosen theme of the application',
    example: 'default',
  })
  @Column({ default: 'default' })
  theme: string;

  @ApiProperty({
    description: 'Preferred font size',
    example: 'standard',
  })
  @Column({ default: 'standard' })
  font_size: string;

  @ApiProperty({
    description:
      'Whether user will receive notifications about upcoming events',
    example: true,
  })
  @Column({ default: true })
  event_notifications: boolean;

  @ApiProperty({
    description:
      'Whether user will receive notifications about upcoming donations',
    example: true,
  })
  @Column({ default: true })
  reminder_notifications: boolean;

  @ApiProperty({
    description: 'Time of user settings creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Time of last settings update',
    example: '2002-02-02T22:22:22.22Z',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
