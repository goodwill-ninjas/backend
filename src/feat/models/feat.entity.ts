import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatRankEntity } from './feat-rank.entity';
import { FeatCompletionEntity } from './feat-completion.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('feat')
export class FeatEntity {
  @ApiProperty({
    description: 'Primary key as Feat ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Feat name',
    example: 'Blood Donor',
  })
  @Column()
  name: string;

  @ApiProperty({
    description:
      'Goal of the objective with the requirements in square brackets []',
    example: 'Donate blood [1, 3, 5] times',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Rank(s) of the feat',
    example: FeatRankEntity,
  })
  @OneToMany(() => FeatRankEntity, rank => rank.feat, { eager: true })
  ranks: FeatRankEntity[];

  @Exclude()
  @OneToMany(() => FeatCompletionEntity, completion => completion.feat)
  completions: FeatCompletionEntity[];

  @ApiProperty({
    description: 'Time of feat creation',
    example: '2002-02-02T:22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
