import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodCenterEntity } from './models/blood-center.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BloodCenterService {
  constructor(
    @InjectRepository(BloodCenterEntity)
    private readonly bloodCenterRepository: Repository<BloodCenterEntity>,
  ) {}

  hello(): string {
    return 'Hello from Blood Center Module';
  }
}
