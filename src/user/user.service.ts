import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSettingEntity } from './models/user-setting.entity';
import { ErrorCodes } from '../common/utilities/error-codes';
import { DonationEntity } from '../donation/models/donation.entity';
import { ImageEntity } from '../image/models/image.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { ExperienceIncreaseEvent } from '../common/events/experience/experienceIncrease';
import { FeatCompletionEntity } from '../feat/models/feat-completion.entity';
import { UserCompletedFeat } from './dto/user-completed-feat.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: Repository<UserSettingEntity>,
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(FeatCompletionEntity)
    private readonly featCompletionRepository: Repository<FeatCompletionEntity>,
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

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
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

  async findUserCompletedFeats(id: number): Promise<UserCompletedFeat[]> {
    await this.findUserById(id);

    const featCompletions = (await this.featCompletionRepository.find({
      where: {
        user_id: id,
      },
    })) as Array<FeatCompletionEntity>;

    return undefined as Array<UserCompletedFeat>;
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const { avatar_id, ...userDetails } = dto;
    const avatar = await this.imageRepository.findOneBy({
      id: avatar_id,
    });
    if (!avatar)
      throw new HttpException(
        `Avatar with id: ${avatar_id} does not exist`,
        HttpStatus.NOT_FOUND,
      );

    try {
      const defaultSettings = await this.userSettingRepository.create();
      await this.userSettingRepository.save(defaultSettings);

      const newUser = await this.userRepository.create({
        ...userDetails,
        avatar,
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

  @OnEvent('experience.increase', { async: true })
  private async handleExperienceIncreaseEvent(
    payload: ExperienceIncreaseEvent,
  ): Promise<void> {
    await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({
        experience: () => `experience + ${payload.experienceAmount}`,
      })
      .where('id = :id', { id: payload.userId })
      .execute();
  }
}
