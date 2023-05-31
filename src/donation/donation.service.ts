import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationEntity } from './models/donation.entity';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DonationSavedEvent } from '../common/events/donations/donationSaved';
import { ExperienceIncreaseEvent } from '../common/events/experience/experienceIncrease';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(EventEmitter2)
    private eventEmitter: EventEmitter2,
  ) {}

  async findDonationById(
    id: number,
    authHeader?: string,
  ): Promise<DonationEntity> {
    const donation = await this.donationRepository.findOneBy({
      id,
    });

    if (!donation)
      throw new HttpException('Donation not found', HttpStatus.NOT_FOUND);
    authHeader &&
      (await this.userService.findUserById(donation.user_id, authHeader));

    return donation;
  }

  async createDonation(
    dto: CreateDonationDto,
    authHeader: string,
  ): Promise<DonationEntity> {
    const { user_id, ...donationDetails } = dto;
    if (dto.disqualified) {
      if (!dto.disqualification_days)
        throw new HttpException(
          'disqualification_days are mandatory when saving a disqualification',
          HttpStatus.BAD_REQUEST,
        );
    } else {
      if (!dto.amount)
        throw new HttpException(
          'amount must be a number conforming to the specified constraints',
          HttpStatus.BAD_REQUEST,
        );
      if (!dto.donated_type)
        throw new HttpException(
          'donated_type must be one of the following values: whole, plasma, power, platelet',
          HttpStatus.BAD_REQUEST,
        );
    }

    const user = await this.userService.findUserById(user_id, authHeader);
    const experienceReward = 50;

    try {
      const newDonation = await this.donationRepository.create({
        ...donationDetails,
        user,
      });
      await this.donationRepository.save(newDonation);

      if (dto.disqualified) return newDonation;

      this.eventEmitter.emit(
        'experience.increase',
        new ExperienceIncreaseEvent({
          userId: user_id,
          experienceAmount: experienceReward,
        }),
      );

      this.eventEmitter.emit(
        'donation.saved',
        new DonationSavedEvent({
          userId: user_id,
          userGender: user.gender,
        }),
      );

      return newDonation;
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  /* With soft delete it is possible to later on
   * implement restore functionality in case user
   * has deleted donation by accident.
   */
  async removeDonation(id: number, authHeader: string): Promise<void> {
    await this.findDonationById(id, authHeader);

    const result = await this.donationRepository.softDelete(id);

    if (!result.affected)
      throw new HttpException(
        `Donation with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
