import { Controller } from '@nestjs/common';
import { SocialMediaPostService } from './social-media-post.service';

@Controller('social-posts')
export class SocialMediaPostController {
  constructor(
    private readonly socialMediaPostService: SocialMediaPostService,
  ) {}
}
