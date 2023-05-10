import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserSettingEntity } from './models/user-setting.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { ImageEntity } from '../image/models/image.entity';
import { FeatCompletionEntity } from '../feat/models/feat-completion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserSettingEntity,
      DonationEntity,
      ImageEntity,
      FeatCompletionEntity,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
