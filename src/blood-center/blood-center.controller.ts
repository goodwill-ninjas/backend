import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterEntity } from './models/blood-center.entity';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';

@Controller('blood-centers')
export class BloodCenterController {
  constructor(private readonly bloodCenterService: BloodCenterService) {}

  //TODO: Details gets are pointless? simply populate the relation with eager?

  @Get()
  async getAllBloodCenters(): Promise<BloodCenterEntity[]> {
    return await this.bloodCenterService.findBloodCenters();
  }

  @Get('status')
  getAllBloodCentersDetails(): string {
    return this.bloodCenterService.hello();
  }

  @Get(':blood-center')
  getBloodCenter(@Param('blood-center') bloodCenter: string): string {
    return this.bloodCenterService.hello();
  }

  @Get(':blood-center/status')
  getBloodCenterDetails(@Param('blood-center') bloodCenter: string): string {
    return this.bloodCenterService.hello();
  }

  @Post('status')
  async createBloodDetailStatus(
    @Body() body: SaveBloodCenterDetailsDto,
  ): Promise<void> {
    return this.bloodCenterService.saveBloodCenterDetails(body);
  }
}
