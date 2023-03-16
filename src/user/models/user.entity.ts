import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonationEntity } from '../../donation/models/donation.entity';
import { SocialMediaPostEntity } from '../../social-media-post/models/social-media-post.entity';
import { ImageEntity } from '../../image/models/image.entity';
import { FeatCompletionEntity } from '../../feat/models/feat-completion.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  blood_type: string;

  @Column()
  gender: string;

  @OneToOne(() => ImageEntity)
  @JoinColumn()
  avatar_: ImageEntity;

  @Column()
  experience: number;

  @OneToMany(() => DonationEntity, donation => donation.user_)
  donations: DonationEntity[];

  @OneToMany(() => SocialMediaPostEntity, post => post.author_)
  social_media_posts: SocialMediaPostEntity[];

  @OneToMany(() => FeatCompletionEntity, completion => completion.user_)
  achieved_feats: FeatCompletionEntity[];

  @OneToMany(() => UserEntity, user => user.id)
  invited_users: UserEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
