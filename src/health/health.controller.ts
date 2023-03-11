import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.http.pingCheck('API Check', 'http://localhost:3000/api'),
      (): Promise<HealthIndicatorResult> => this.db.pingCheck('Database Check'),
    ]);
  }

  @Get()
  @HealthCheck()
  databaseCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
