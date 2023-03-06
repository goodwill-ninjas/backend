import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('social_posts')
export class SocialMediaPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.social_media_posts)
  author_: number;

  @Column()
  media_type: string;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}