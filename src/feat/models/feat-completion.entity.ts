import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { FeatEntity } from './feat.entity';

@Entity('feat_completion')
export class FeatCompletionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.achieved_feats)
  user_: UserEntity;

  @ManyToOne(() => FeatEntity, feat => feat.completions)
  feat_: FeatEntity;

  @Column()
  feat_rank: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
