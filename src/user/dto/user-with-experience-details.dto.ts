import { UserEntity } from '../models/user.entity';
import { ImageEntity } from '../../image/models/image.entity';
import { UserSettingEntity } from '../models/user-setting.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { BloodType } from '../../common/enum/blood-type.enum';
import { GenderIdentity } from '../../common/enum/gender-identity.enum';
import { ExperienceDetails } from '../interfaces/experience-details';

export class UserWithExperienceDetails
  implements
    Omit<
      UserEntity,
      | 'experience'
      | 'password'
      | 'avatar_id'
      | 'achieved_feats'
      | 'donations'
      | 'invited_users'
      | 'social_media_posts'
    >
{
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
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Mary_02',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User blood type',
    example: 'AB Rh-',
  })
  @IsEnum(BloodType)
  blood_type: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Female',
  })
  @IsEnum(GenderIdentity)
  gender: string;

  @ApiProperty({
    description: 'User settings',
    example: UserSettingEntity,
  })
  settings: UserSettingEntity;

  @ApiProperty({
    description: 'User avatar id',
    example: 1,
  })
  avatar: ImageEntity;

  @ApiProperty({
    description: 'Whether the user has verified his email ',
    example: true,
  })
  has_verified_email: boolean;

  @ApiProperty({
    description: 'Time of user creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Current level, experience and min/max thresholds',
    example: {
      level: 2,
      currentExperience: 70,
      minExperience: 50,
      maxExperience: 99,
    },
  })
  exp_details: ExperienceDetails;

  @ApiProperty({
    description: 'Date after which user can donate blood once more',
    example: '2002-02-02T22:22:22.22Z',
  })
  can_donate_after: Date;
}
