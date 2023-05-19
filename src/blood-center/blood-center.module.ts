import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterController } from './blood-center.controller';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailEntity } from './models/blood-center-detail.entity';
import { BloodCenterEventEntity } from './models/blood-center-event.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BloodCenterEntity,
      BloodCenterDetailEntity,
      BloodCenterEventEntity,
    ]),
    ConfigModule,
  ],
  providers: [BloodCenterService],
  controllers: [BloodCenterController],
})
export class BloodCenterModule {}
