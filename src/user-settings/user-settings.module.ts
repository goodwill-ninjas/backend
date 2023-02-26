import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingsEntity } from './models/user-settings.entity';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSettingsEntity])],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
})
export class UserSettingsModule {}
