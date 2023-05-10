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
import { Exclude } from 'class-transformer';

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
  user: () => UserEntity;

  @Column()
  user_id: number;

  @ApiProperty({
    description:
      'Feat in question and all of its ranks, including ones not yet achieved by the user',
    example: FeatEntity,
  })
  @ManyToOne(() => FeatEntity, feat => feat.completions, {
    eager: true,
  })
  @JoinColumn({ name: 'feat_id' })
  feat: () => FeatEntity;

  @Exclude()
  @Column()
  feat_id: number;

  @ApiProperty({
    description: 'Feat Ranks that have been achieved',
    example: FeatRankEntity,
    isArray: true,
  })
  @ManyToOne(() => FeatRankEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'feat_rank_id' })
  feat_rank: () => FeatRankEntity;

  @Exclude()
  @Column()
  feat_rank_id: number;

  @ApiProperty({
    description: 'Time of feat completion creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
