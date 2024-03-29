import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserSettingEntity } from './models/user-setting.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { ImageEntity } from '../image/models/image.entity';
import { FeatCompletionEntity } from '../feat/models/feat-completion.entity';
import { FeatEntity } from '../feat/models/feat.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserSettingEntity,
      DonationEntity,
      ImageEntity,
      FeatEntity,
      FeatCompletionEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
