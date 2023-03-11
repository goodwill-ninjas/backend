import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationEntity } from './models/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
  ) {}

  hello(): string {
    return 'Hello from Donation Module';
  }
}
