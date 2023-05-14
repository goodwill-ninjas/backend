import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { FeatService } from './feat.service';
import { FeatEntity } from './models/feat.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Feats/Missions')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('feats')
export class FeatController {
  constructor(private readonly featService: FeatService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Feats',
    description: 'Returns a list of all feats and their ranks.',
  })
  @ApiOkResponse({
    type: FeatEntity,
    isArray: true,
    description: 'List of available feats',
  })
  async getAllFeats(): Promise<FeatEntity[]> {
    return await this.featService.findFeats();
  }
}
