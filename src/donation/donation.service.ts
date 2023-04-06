import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationEntity } from './models/donation.entity';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async findDonations(): Promise<DonationEntity[]> {
    return await this.donationRepository.find();
  }

  async findDonationById(id: number): Promise<DonationEntity> {
    const donation = await this.donationRepository.findOneBy({
      id,
    });

    if (!donation)
      throw new HttpException('Donation not found', HttpStatus.NOT_FOUND);

    return donation;
  }

  async createDonation(
    createDonationDto: CreateDonationDto,
  ): Promise<DonationEntity> {
    const { user_id, ...donationDetails } = createDonationDto;
    const user = await this.userService.findUserById(user_id);

    try {
      const newDonation = await this.donationRepository.create({
        ...donationDetails,
        user,
      });
      await this.donationRepository.save(newDonation);

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
