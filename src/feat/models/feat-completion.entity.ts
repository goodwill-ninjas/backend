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
import { ApiProperty } from '@nestjs/swagger';
import { FeatRankEntity } from './feat-rank.entity';

@Entity('feat_completion')
export class FeatCompletionEntity {
  @ApiProperty({
    description: 'Primary key as Feat Completion ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of user that has completed the feat',
    example: 2,
  })
  @ManyToOne(() => UserEntity, user => user.achieved_feats)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: number;

  @ManyToOne(() => FeatEntity, feat => feat.completions)
  @JoinColumn({ name: 'feat_id' })
  feat: FeatEntity;

  @Column()
  feat_id: number;

  @ManyToOne(() => FeatRankEntity)
  @JoinColumn({ name: 'feat_rank_id' })
  feat_rank: FeatRankEntity;

  @Column()
  feat_rank_id: number;

  @ApiProperty({
    description: 'Time of feat completion creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
