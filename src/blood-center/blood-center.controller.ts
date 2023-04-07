import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterEntity } from './models/blood-center.entity';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Blood Centers')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('blood-centers')
export class BloodCenterController {
  constructor(private readonly bloodCenterService: BloodCenterService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Blood Centers',
    description: 'Returns a list of all Blood Centers.',
  })
  @ApiOkResponse({
    type: BloodCenterEntity,
    isArray: true,
    description: 'Lists all Blood Centers',
  })
  async getAllBloodCenters(): Promise<BloodCenterEntity[]> {
    return await this.bloodCenterService.findBloodCenters();
  }

  @Get(':city')
  @ApiOperation({
    summary: 'Get Blood Center',
    description:
      'Tries to find a single Blood Center matching the given city. Also returns details about blood capacity in given Blood Center.\nKeep in mind this should only be used for finding Blood Centers, not local collection sites.',
  })
  @ApiOkResponse({
    type: BloodCenterEntity,
    description: 'Finds Blood Center with matching city',
  })
  @ApiNotFoundResponse({
    description: 'Blood Center in given city does not exist',
  })
  async getBloodCenter(
    @Param('city') city: string,
  ): Promise<BloodCenterEntity> {
    return await this.bloodCenterService.findBloodCenterByCity(city);
  }

  @Post('status')
  @ApiOperation({
    summary: 'Update Blood Bank Capacity',
    description:
      'Create a new set of Blood Center Details for every Blood Center.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Saved new set of Blood Bank Capacities',
  })
  @ApiBadRequestResponse({
    description:
      'Creating new set of Blood Center Details failed. Please check request body',
  })
  async createBloodDetailStatus(
    @Body() body: SaveBloodCenterDetailsDto,
  ): Promise<void> {
    return this.bloodCenterService.saveBloodCenterDetails(body);
  }
}
