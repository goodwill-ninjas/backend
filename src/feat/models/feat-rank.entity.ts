import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatEntity } from './feat.entity';
import { ImageEntity } from '../../image/models/image.entity';

@Entity('feat_rank')
export class FeatRankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeatEntity, feat => feat.ranks)
  feat_: FeatEntity;

  @Column()
  rank: number;

  @Column()
  experience_award: number;

  @Column({ nullable: true })
  title_award: string;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn()
  avatar_award_: ImageEntity;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn()
  medal_award_: ImageEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
