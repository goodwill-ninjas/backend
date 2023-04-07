import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSettingEntity } from './models/user-setting.entity';
import { ErrorCodes } from '../common/utilities/error-codes';
import { DonationEntity } from '../donation/models/donation.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: Repository<UserSettingEntity>,
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
  ) {}

  async findUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.settings', 'settings')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserDonations(id: number): Promise<DonationEntity[]> {
    await this.findUserById(id);

    return await this.donationRepository.find({
      where: {
        user_id: id,
      },
    });
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const defaultSettings = await this.userSettingRepository.create();
      await this.userSettingRepository.save(defaultSettings);

      const newUser = await this.userRepository.create({
        ...dto,
        experience: 0,
        settings: defaultSettings,
      });
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      if (error.code === ErrorCodes.UNIQUE_VALUE) {
        const key = error.detail
          .split(' ')[1]
          .split('=')[0]
          .substring(1)
          .slice(0, -1);
        throw new HttpException(
          `${key} is already taken`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async removeUser(id: number): Promise<void> {
    await this.donationRepository
      .createQueryBuilder('donation')
      .softDelete()
      .where('user_id = :id', { id })
      .execute();

    const result = await this.userRepository.delete(id);

    if (!result.affected)
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
