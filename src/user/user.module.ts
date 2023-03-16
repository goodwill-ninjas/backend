import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserSettingEntity } from './models/user-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
