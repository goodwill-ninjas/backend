import { Controller, Get } from '@nestjs/common';
import { SocialMediaPostService } from './social-media-post.service';

@Controller('social-posts')
export class SocialMediaPostController {
  constructor(
    private readonly socialMediaPostService: SocialMediaPostService,
  ) {}

  @Get()
  hello(): string {
    return this.socialMediaPostService.hello();
  }
}
