import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Base')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @ApiBearerAuth()
  @HealthCheck()
  @ApiOperation({
    summary: 'Health Check',
    description:
      "Creates a request to 'api/status' and executes 'SELECT 1' in DB to check the status of the services.",
  })
  @ApiOkResponse({
    description: 'Services are running OK',
  })
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.http.pingCheck('API Check', 'http://localhost:3000/api/status'),
      (): Promise<HealthIndicatorResult> => this.db.pingCheck('Database Check'),
    ]);
  }
}
