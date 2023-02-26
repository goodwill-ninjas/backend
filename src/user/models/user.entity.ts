import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonationEntity as Donation } from '../../donation/models/donation.entity';
import { SocialMediaPostEntity as SocialMediaPost } from '../../social-media-post/models/social-media-post.entity';
import { ImageEntity as Image } from '../../image/models/image.entity';

@Entity('users')
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

  @OneToOne(() => Image)
  @JoinColumn()
  avatar_: Image;

  @Column()
  experience: number;

  @OneToMany(() => Donation, donation => donation.user_)
  donations: Donation[];

  @OneToMany(() => SocialMediaPost, post => post.author_)
  social_media_posts: SocialMediaPost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
