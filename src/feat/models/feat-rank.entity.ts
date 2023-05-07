import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatEntity } from './feat.entity';
import { ImageEntity } from '../../image/models/image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('feat_rank')
export class FeatRankEntity {
  @ApiProperty({
    description: 'Primary key as Feat Rank ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of parent Feat',
    example: 1,
  })
  @ManyToOne(() => FeatEntity, feat => feat.ranks)
  @JoinColumn({ name: 'feat_id' })
  feat: FeatEntity;

  @ApiProperty({
    description: 'Number of which step is this rank',
    example: 2,
  })
  @Column()
  rank: number;

  @ApiProperty({
    description:
      'Numerical requirement for achieving this rank. Please look at feat description',
    example: 5,
  })
  @Column()
  requirement: number;

  @ApiProperty({
    description: 'Experience reward for completing this rank',
    example: 50,
  })
  @Column()
  experience_award: number;

  @ApiProperty({
    description: 'If applicable: title reward for completing this rank',
    example: 'Legendary Donor',
  })
  @Column({ nullable: true })
  title_award: string;

  @ApiProperty({
    description: 'If applicable: avatar reward for completing this rank',
    example: ImageEntity,
  })
  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn({ name: 'avatar_award_id' })
  avatar_award: ImageEntity;

  @ApiProperty({
    description: 'If applicable: medal reward for completing this rank',
    example: ImageEntity,
  })
  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn({ name: 'medal_award_id' })
  medal_award: ImageEntity;

  @ApiProperty({
    description: 'Time of feat rank creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
