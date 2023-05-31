import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiExcludeController()
@ApiTags('Base')
@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'API Status Check',
    description:
      'Endpoint used for checking status of the API by the Health Check Module.',
  })
  @ApiOkResponse({ description: 'API is running' })
  getHello(): string {
    return this.appService.getStatus();
  }
}
