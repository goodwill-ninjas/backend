import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatRankEntity } from './feat-rank.entity';
import { FeatCompletionEntity } from './feat-completion.entity';

@Entity('feat')
export class FeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => FeatRankEntity, rank => rank.feat)
  ranks: FeatRankEntity[];

  @OneToMany(() => FeatCompletionEntity, completion => completion.feat)
  completions: FeatCompletionEntity[];

  @CreateDateColumn()
  created_at: Date;
}
