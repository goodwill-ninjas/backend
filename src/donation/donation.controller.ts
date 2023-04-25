import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationEntity } from './models/donation.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDonationDto } from './dto/create-donation.dto';

@ApiTags('Donations')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Donation',
    description: 'Tries to find a single donation matching the given id.',
  })
  @ApiOkResponse({
    type: DonationEntity,
    description: 'Finds donation with matching id',
  })
  @ApiNotFoundResponse({
    description: 'Donation with given id does not exist',
  })
  getDonation(@Param('id', ParseIntPipe) id: number): Promise<DonationEntity> {
    return this.donationService.findDonationById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add Donation',
    description: 'Tries to add a new donation.',
  })
  @ApiCreatedResponse({
    type: DonationEntity,
    description: 'Created donation object',
  })
  @ApiNotFoundResponse({
    description: 'Failed to find user adding the donation',
  })
  @ApiBadRequestResponse({
    description: 'Donation creation failed. Please check request body',
  })
  async addDonation(@Body() body: CreateDonationDto): Promise<DonationEntity> {
    return await this.donationService.createDonation(body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete Donation',
    description: 'Tries to soft delete the donation if donation exists.',
  })
  @ApiNoContentResponse({
    description: 'Donation successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Donation with given id does not exist',
  })
  async deleteDonation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.donationService.removeDonation(id);
  }
}
