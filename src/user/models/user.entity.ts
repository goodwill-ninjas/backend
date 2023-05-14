import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonationEntity } from '../../donation/models/donation.entity';
import { SocialMediaPostEntity } from '../../social-media-post/models/social-media-post.entity';
import { ImageEntity } from '../../image/models/image.entity';
import { FeatCompletionEntity } from '../../feat/models/feat-completion.entity';
import { Exclude } from 'class-transformer';
import { UserSettingEntity } from './user-setting.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty({
    description: 'Primary key as User ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User email',
    example: 'foo@bar.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Mary_02',
  })
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'User blood type',
    example: 'AB Rh-',
  })
  @Column()
  blood_type: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Female',
  })
  @Column()
  gender: string;

  @ApiProperty({
    description: 'User settings',
    example: UserSettingEntity,
  })
  @OneToOne(() => UserSettingEntity, userSetting => userSetting.user, {
    eager: true,
  })
  settings: UserSettingEntity;

  @ApiProperty({
    description: 'User avatar id',
    example: 1,
  })
  @ManyToOne(() => ImageEntity, { eager: true })
  @JoinColumn({ name: 'avatar_id' })
  avatar: ImageEntity;

  @Column()
  avatar_id: number;

  @ApiProperty({
    description: 'User total experience',
    example: 1337,
  })
  @Column()
  experience: number;

  @OneToMany(() => DonationEntity, donation => donation.user, {
    cascade: true,
  })
  donations: DonationEntity[];

  @Exclude()
  @OneToMany(() => SocialMediaPostEntity, post => post.author)
  social_media_posts: SocialMediaPostEntity[];

  @OneToMany(() => FeatCompletionEntity, completion => completion.user)
  achieved_feats: FeatCompletionEntity[];

  @Exclude()
  @OneToMany(() => UserEntity, user => user.id)
  invited_users: UserEntity[];

  @ApiProperty({
    description: 'Time of user creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
