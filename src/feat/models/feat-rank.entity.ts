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

@Entity('feat_rank')
export class FeatRankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeatEntity, feat => feat.ranks)
  @JoinColumn({ name: 'feat_id' })
  feat: FeatEntity;

  @Column()
  rank: number;

  @Column()
  experience_award: number;

  @Column({ nullable: true })
  title_award: string;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn({ name: 'avatar_award_id' })
  avatar_award: ImageEntity;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn({ name: 'medal_award_id' })
  medal_award: ImageEntity;

  @CreateDateColumn()
  created_at: Date;
}
