import { Controller, Get } from '@nestjs/common';
import { BloodCenterService } from './blood-center.service';

@Controller('blood-centers')
export class BloodCenterController {
  constructor(private readonly bloodCenterService: BloodCenterService) {}

  @Get()
  hello(): string {
    return this.bloodCenterService.hello();
  }
}
