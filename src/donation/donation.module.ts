import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationEntity } from './models/donation.entity';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([DonationEntity])],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
