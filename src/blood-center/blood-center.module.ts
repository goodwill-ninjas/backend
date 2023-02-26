import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterController } from './blood-center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BloodCenterModule])],
  providers: [BloodCenterService],
  controllers: [BloodCenterController],
})
export class BloodCenterModule {}
