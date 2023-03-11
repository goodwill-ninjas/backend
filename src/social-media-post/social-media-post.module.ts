import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaPostEntity } from './models/social-media-post.entity';
import { SocialMediaPostService } from './social-media-post.service';
import { SocialMediaPostController } from './social-media-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMediaPostEntity])],
  providers: [SocialMediaPostService],
  controllers: [SocialMediaPostController],
})
export class SocialMediaPostModule {}
