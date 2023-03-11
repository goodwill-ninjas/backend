import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterController } from './blood-center.controller';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailsEntity } from './models/blood-center-details.entity';
import { BloodCenterEventEntity } from './models/blood-center-event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BloodCenterEntity,
      BloodCenterDetailsEntity,
      BloodCenterEventEntity,
    ]),
  ],
  providers: [BloodCenterService],
  controllers: [BloodCenterController],
})
export class BloodCenterModule {}
