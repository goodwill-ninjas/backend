import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatEntity } from './models/feat.entity';
import { Repository } from 'typeorm';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DonationSavedEvent } from '../common/events/donations/donationSaved';
import { DonationEntity } from '../donation/models/donation.entity';
import { FeatNames } from '../common/enum/feat-names.enum';
import { GenderIdentity } from '../common/enum/gender-identity.enum';
import { FeatRankEntity } from './models/feat-rank.entity';
import { FeatCompletionEntity } from './models/feat-completion.entity';
import { ExperienceIncreaseEvent } from '../common/events/experience/experienceIncrease';

@Injectable()
export class FeatService {
  constructor(
    @InjectRepository(FeatEntity)
    private readonly featRepository: Repository<FeatEntity>,
    @InjectRepository(FeatRankEntity)
    private readonly featRankRepository: Repository<FeatRankEntity>,
    @InjectRepository(FeatCompletionEntity)
    private readonly featCompletionRepository: Repository<FeatCompletionEntity>,
    @InjectRepository(DonationEntity)
    private readonly donationRepository: Repository<DonationEntity>,
    @Inject(EventEmitter2)
    private eventEmitter: EventEmitter2,
  ) {}

  async findFeats(): Promise<FeatEntity[]> {
    return await this.featRepository.find();
  }

  private async findFeatCompletion(
    userId: number,
    featId: number,
    featRankId: number,
  ): Promise<FeatCompletionEntity> {
    return await this.featCompletionRepository.findOne({
      where: {
        user_id: userId,
        feat_id: featId,
        feat_rank_id: featRankId,
      },
    });
  }

  private async createFeatCompletion(
    userId: number,
    featId: number,
    featRankId: number,
    experienceReward: number,
  ): Promise<void> {
    try {
      const newFeatCompletion = await this.featCompletionRepository.create({
        user_id: userId,
        feat_id: featId,
        feat_rank_id: featRankId,
      });

      await this.featCompletionRepository.save(newFeatCompletion);

      this.eventEmitter.emit(
        'experience.increase',
        new ExperienceIncreaseEvent({
          userId,
          experienceAmount: experienceReward,
        }),
      );
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  @OnEvent('donation.saved', { async: true })
  private async handleDonationSavedEvent(
    payload: DonationSavedEvent,
  ): Promise<void> {
    const feats = await this.findFeats();
    const userDonations = await this.donationRepository.findAndCount({
      where: {
        user_id: payload.userId,
      },
    });
    const bloodDonatedInLiters: number =
      userDonations[0].reduce((total, donation) => total + donation.amount, 0) /
      1000; // Divide by 1000 to get number of liters instead of milliliters

    await this.handleFeatCompletion(
      payload.userId,
      feats.find(feat => feat.name === FeatNames.BLOOD_DONOR),
      userDonations[1], // Donations count returned by findAndCount() method of Repository<T>
    );

    await this.handleFeatCompletion(
      payload.userId,
      payload.userGender === GenderIdentity.FEMALE
        ? feats.find(feat => feat.name === FeatNames.HONORARY_FEMALE_DONOR)
        : feats.find(feat => feat.name === FeatNames.HONORARY_MALE_DONOR),
      bloodDonatedInLiters,
    );

    await this.handleFeatCompletion(
      payload.userId,
      feats.find(feat => feat.name === FeatNames.HEALTH_OF_NATION_DONOR),
      bloodDonatedInLiters,
    );
  }

  /**
   *  1. For given FeatEntity loop through every FeatRankEntity and compare Rank.Requirement with featContextValue to check if requirement has been met.
   *  2. If requirement has been met store ID of the Rank and its experience reward. If exists check next Rank.
   *  3. If requirement has not been met and thus no Rank ID is being stored - abandon procedure.
   *  4. Check if FeatCompletionEntity for given User, Feat and Feat Rank already exists.
   *  5. If this specific FeatCompletionEntity does not exist - create and save it to the DB.
   * */
  private async handleFeatCompletion(
    userId: number,
    feat: FeatEntity,
    featContextValue: number,
  ): Promise<void> {
    let highestRankAchievedId: number = null;
    let experienceReward = 0;
    feat.ranks.forEach(rank => {
      if (featContextValue < rank.requirement) return;
      highestRankAchievedId = rank.id;
      experienceReward = rank.experience_award;
    });
    if (!highestRankAchievedId) return;

    const commonProps = [userId, feat.id, highestRankAchievedId] as const;

    const isAlreadyCompleted = !!(await this.findFeatCompletion(
      ...commonProps,
    ));
    if (isAlreadyCompleted) return;

    await this.createFeatCompletion(...commonProps, experienceReward);
  }
}
