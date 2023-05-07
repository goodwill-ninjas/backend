import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserSettingEntity } from './models/user-setting.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { ImageEntity } from '../image/models/image.entity';
import { FeatEntity } from '../feat/models/feat.entity';
import { FeatCompletionEntity } from '../feat/models/feat-completion.entity';
import { FeatRankEntity } from '../feat/models/feat-rank.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserSettingEntity,
      DonationEntity,
      ImageEntity,
      FeatEntity,
      FeatRankEntity,
      FeatCompletionEntity,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
