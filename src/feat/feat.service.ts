import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatEntity } from './models/feat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeatService {
  constructor(
    @InjectRepository(FeatEntity)
    private readonly featRepository: Repository<FeatEntity>,
  ) {}

  async findFeats(): Promise<FeatEntity[]> {
    return await this.featRepository.find();
  }
}
