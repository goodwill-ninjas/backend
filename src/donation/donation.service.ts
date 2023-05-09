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

  async findDonationById(id: number): Promise<DonationEntity> {
    const donation = await this.donationRepository.findOneBy({
      id,
    });

    if (!donation)
      throw new HttpException('Donation not found', HttpStatus.NOT_FOUND);

    return donation;
  }

  async createDonation(dto: CreateDonationDto): Promise<DonationEntity> {
    const { user_id, ...donationDetails } = dto;
    const user = await this.userService.findUserById(user_id);
    const experienceReward = 50;

    try {
      const newDonation = await this.donationRepository.create({
        ...donationDetails,
        user,
      });
      await this.donationRepository.save(newDonation);

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
  async removeDonation(id: number): Promise<void> {
    const result = await this.donationRepository.softDelete(id);

    if (!result.affected)
      throw new HttpException(
        `Donation with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
