import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => FeatRankEntity, rank => rank.feat_)
  ranks: FeatRankEntity[];

  @OneToMany(() => FeatCompletionEntity, completion => completion.feat_)
  completions: FeatCompletionEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
