import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { FeatEntity } from './feat.entity';

@Entity('feat_completion')
export class FeatCompletionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.achieved_feats)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => FeatEntity, feat => feat.completions)
  @JoinColumn({ name: 'feat_id' })
  feat: FeatEntity;

  @Column()
  feat_rank: number;

  @CreateDateColumn()
  created_at: Date;
}
