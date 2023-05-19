import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailEntity } from './models/blood-center-detail.entity';
import { Repository } from 'typeorm';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';
import { ParsedBloodCenterDetailRequest } from './interfaces/parsed-blood-center-detail.request';
import { BloodType } from '../common/enum/blood-type.enum';
import { BloodStatus } from '../common/enum/blood-status.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BloodCenterService {
  constructor(
    @InjectRepository(BloodCenterEntity)
    private readonly bloodCenterRepository: Repository<BloodCenterEntity>,
    @InjectRepository(BloodCenterDetailEntity)
    private readonly bloodCenterDetailRepository: Repository<BloodCenterDetailEntity>,
    private readonly configService: ConfigService,
  ) {}

  async findBloodCenters(): Promise<BloodCenterEntity[]> {
    return await this.bloodCenterRepository.find();
  }

  async findBloodCenterByCity(city: string): Promise<BloodCenterEntity> {
    const bloodCenter = await this.bloodCenterRepository
      .createQueryBuilder('blood_center')
      .leftJoinAndSelect('blood_center.blood_center_details', 'details')
      .where('blood_center.city = :city', { city })
      .orderBy('details.created_at', 'DESC')
      .limit(8)
      .getOne();

    if (!bloodCenter)
      throw new HttpException('Blood Center not found', HttpStatus.NOT_FOUND);
    return bloodCenter;
  }

  async saveBloodCenterDetails(
    detailsDto: SaveBloodCenterDetailsDto,
    authHeader: string,
  ): Promise<void> {
    if (
      !authHeader ||
      this.configService.get('WEB_SCRAPER_TOKEN') !==
        authHeader.replace('Token ', '')
    )
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    for (const request of this.parseSaveDetailsRequest(detailsDto)) {
      const { city, ...requestDetails } = request;
      const bloodCenter = await this.bloodCenterRepository.findOneBy({
        city,
      });

      if (!bloodCenter)
        throw new HttpException(
          `Failed trying to parse details with city: ${city}`,
          HttpStatus.BAD_REQUEST,
        );

      const newBloodCenterDetail =
        await this.bloodCenterDetailRepository.create({
          ...requestDetails,
          blood_center: bloodCenter,
        });

      await this.bloodCenterDetailRepository.save(newBloodCenterDetail);
    }
  }

  private parseSaveDetailsRequest = (
    dto: SaveBloodCenterDetailsDto,
  ): ParsedBloodCenterDetailRequest[] => {
    const requestAsArray = [];
    for (const [city, bloodDetails] of Object.entries(dto.blood_banks)) {
      this.validateBloodRequestLength(bloodDetails);
      this.validateBloodTypes(bloodDetails);
      this.validateBloodStatuses(bloodDetails);

      requestAsArray.push({
        city,
        bloodDetails,
      });
    }

    const parsedRequests = [];
    requestAsArray.forEach(async bloodBank => {
      for (const [bloodType, capacity] of Object.entries(
        bloodBank.bloodDetails,
      )) {
        parsedRequests.push({
          city: bloodBank.city,
          blood_type: bloodType,
          capacity,
          source_datetime: dto.datetime_modified,
        });
      }
    });

    return parsedRequests;
  };

  private validateBloodRequestLength = (bloodDetails: object): void => {
    if (Object.keys(bloodDetails).length !== 8)
      throw new HttpException(
        `Expected 8 unique properties for each city, instead got ${
          Object.keys(bloodDetails).length
        }`,
        HttpStatus.BAD_REQUEST,
      );
  };

  private validateBloodTypes = (bloodDetails: object): void => {
    if (
      !Object.keys(bloodDetails).every(bloodType =>
        Object.values(BloodType).includes(<BloodType>bloodType),
      )
    ) {
      throw new HttpException(
        `Provided blood types must be one of: [${Object.values(BloodType)}]`,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  private validateBloodStatuses = (bloodDetails: object): void => {
    if (
      !Object.values(bloodDetails).every(bloodStatus =>
        Object.values(BloodStatus).includes(<BloodStatus>bloodStatus),
      )
    ) {
      throw new HttpException(
        `Provided blood status must be one of: [${Object.values(BloodStatus)}]`,
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
