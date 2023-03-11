import { Controller, Get } from '@nestjs/common';
import { FeatService } from './feat.service';

@Controller('feats')
export class FeatController {
  constructor(private readonly featService: FeatService) {}

  @Get()
  hello(): string {
    return this.featService.hello();
  }
}
