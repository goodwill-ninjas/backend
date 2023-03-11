import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserSettingsEntity } from './models/user-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
