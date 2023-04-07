import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailEntity } from './models/blood-center-detail.entity';
import { Repository } from 'typeorm';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';

@Injectable()
export class BloodCenterService {
  constructor(
    @InjectRepository(BloodCenterEntity)
    private readonly bloodCenterRepository: Repository<BloodCenterEntity>,
    @InjectRepository(BloodCenterDetailEntity)
    private readonly bloodCenterDetailRepository: Repository<BloodCenterDetailEntity>,
  ) {}

  async findBloodCenters(): Promise<BloodCenterEntity[]> {
    return await this.bloodCenterRepository.find();
  }

  //TODO: migration script to save main blood centers otherwise this is pointless

  async saveBloodCenterDetails(
    detailsDto: SaveBloodCenterDetailsDto,
  ): Promise<void> {
    console.log('x');
  }

  hello(): string {
    return 'Hello from Blood Center Module';
  }
}
