import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatEntity } from './models/feat.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { DonationSavedEvent } from '../common/events/donations/donationSaved';
import { DonationEntity } from '../donation/models/donation.entity';
import { FeatNames } from '../common/enum/feat-names.enum';
import { GenderIdentity } from '../common/enum/gender-identity.enum';
import { FeatRankEntity } from './models/feat-rank.entity';
import { FeatCompletionEntity } from './models/feat-completion.entity';

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
  ) {}

  async findFeats(): Promise<FeatEntity[]> {
    return await this.featRepository.find();
  }

  async createFeatCompletion(): Promise<void> {
    await this.featCompletionRepository;
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
    const bloodDonatedInMilliliters: number = userDonations[0].reduce(
      (total, donation) => total + donation.amount,
      0,
    );

    this.handleBloodDonorFeat(
      feats.find(feat => feat.name === FeatNames.BLOOD_DONOR),
      userDonations[1], // donations count returned by findAndCount() method of Repository<T>
    );

    this.handleHonoraryDonorFeat(
      payload.userGender === GenderIdentity.FEMALE
        ? feats.find(feat => feat.name === FeatNames.HONORARY_FEMALE_DONOR)
        : feats.find(feat => feat.name === FeatNames.HONORARY_MALE_DONOR),
      bloodDonatedInMilliliters,
    );

    this.handleHealthOfNationDonorFeat(
      feats.find(feat => feat.name === FeatNames.HEALTH_OF_NATION_DONOR),
      bloodDonatedInMilliliters,
    );
  }

  private handleBloodDonorFeat(feat: FeatEntity, donationsCount: number): void {
    console.log('\nhandleBloodDonorFeat');
    console.log(feat);
    console.log(donationsCount);
  }

  private handleHonoraryDonorFeat(
    feat: FeatEntity,
    bloodDonatedInMilliliters: number,
  ): void {
    console.log('\nhandleHonoraryDonorFeat');
    console.log(feat);
    console.log(bloodDonatedInMilliliters);
  }

  private handleHealthOfNationDonorFeat(
    feat: FeatEntity,
    bloodDonatedInMilliliters: number,
  ): void {
    console.log('\nhandleHealthOfNationDonorFeat');
    console.log(feat);
    console.log(bloodDonatedInMilliliters);
  }
}
