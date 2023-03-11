import { Controller, Get } from '@nestjs/common';
import { DonationService } from './donation.service';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  hello(): string {
    return this.donationService.hello();
  }
}
