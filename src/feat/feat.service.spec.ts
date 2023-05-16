import { FeatService } from './feat.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeatEntity } from './models/feat.entity';
import { FeatCompletionEntity } from './models/feat-completion.entity';
import { FeatRankEntity } from './models/feat-rank.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('FeatService', () => {
  const exampleFeat = new FeatEntity();

  let service: FeatService;
  const mockFeatRepository = {
    find: jest.fn(() => {
      return [exampleFeat];
    }),
  };
  const mockFeatCompletionRepository = {};
  const mockFeatRankRepository = {};
  const mockDonationRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatService,
        {
          provide: getRepositoryToken(FeatEntity),
          useValue: mockFeatRepository,
        },
        {
          provide: getRepositoryToken(FeatCompletionEntity),
          useValue: mockFeatCompletionRepository,
        },
        {
          provide: getRepositoryToken(FeatRankEntity),
          useValue: mockFeatRankRepository,
        },
        {
          provide: getRepositoryToken(DonationEntity),
          useValue: mockDonationRepository,
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get<FeatService>(FeatService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Finds all feats', () => {
    expect(service.findFeats()).resolves.toEqual([exampleFeat]);
  });
});
