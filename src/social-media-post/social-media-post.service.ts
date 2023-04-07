import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMediaPostEntity } from './models/social-media-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediaPostService {
  constructor(
    @InjectRepository(SocialMediaPostEntity)
    private readonly socialMediaPostRepository: Repository<SocialMediaPostEntity>,
  ) {}
}
