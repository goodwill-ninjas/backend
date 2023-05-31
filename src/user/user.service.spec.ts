import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserSettingEntity } from './models/user-setting.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { ImageEntity } from '../image/models/image.entity';
import { FeatEntity } from '../feat/models/feat.entity';
import { FeatCompletionEntity } from '../feat/models/feat-completion.entity';
import { UserWithExperienceDetails } from './dto/user-with-experience-details.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  const mockToken = 'mock_token';
  const mockDonation = new DonationEntity();
  const mockUser = new UserEntity();
  const mockUserSetting = new UserSettingEntity();
  const mockUserWithExp = new UserWithExperienceDetails();
  const mockId = 1;
  const mockEmail = 'foo@bar.com';

  let service: UserService;

  const mockAuthService = {
    isUserAuthorizedToAccessData: jest.fn((token: string) => !!token),
  };
  const mockUserRepository = {
    find: jest.fn(() => [mockUser]),
    createQueryBuilder: jest.fn(() => ({
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(() => {
        mockUserWithExp.expDetails = {
          currentExperience: undefined,
          level: 10,
          maxExperience: 0,
          minExperience: 7770,
        };
        return mockUserWithExp;
      }),
    })),
    calculateLevel: jest.fn().mockReturnThis(),
    create: jest.fn(() => mockUser),
    save: jest.fn().mockReturnThis(),
    delete: jest.fn(async () => ({ affected: 1 })),
    update: jest.fn((id: number, body: { username: string }) => {
      mockUserWithExp.username = body.username;
      return mockUserWithExp;
    }),
  };
  const mockUserSettingRepository = {
    create: jest.fn().mockReturnThis(),
    save: jest.fn().mockReturnThis(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(() => mockUserSetting),
    })),
    update: jest.fn().mockReturnThis(),
  };
  const mockDonationRepository = {
    find: jest.fn().mockReturnValueOnce([mockDonation]),
    createQueryBuilder: jest.fn(() => ({
      softDelete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnThis(),
    })),
  };
  const mockImageRepository = {};
  const mockFeatRepository = {
    find: jest
      .fn()
      .mockResolvedValue([
        { id: 1, name: 'Feat 1', description: 'Description 1', ranks: [] },
      ]),
  };
  const mockFeatCompletionRepository = {
    query: jest.fn().mockResolvedValue([{ feat_id: 1, achieved_feat_rank: 3 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserSettingEntity),
          useValue: mockUserSettingRepository,
        },
        {
          provide: getRepositoryToken(DonationEntity),
          useValue: mockDonationRepository,
        },
        {
          provide: getRepositoryToken(ImageEntity),
          useValue: mockImageRepository,
        },
        {
          provide: getRepositoryToken(FeatEntity),
          useValue: mockFeatRepository,
        },
        {
          provide: getRepositoryToken(FeatCompletionEntity),
          useValue: mockFeatCompletionRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Finds all users', () => {
    expect(service.findUsers()).resolves.toEqual([mockUser]);
  });

  it('Returns user with corresponding id', () => {
    expect(service.findUserById(mockId, mockToken)).resolves.toEqual(
      mockUserWithExp,
    );
  });

  it('Returns user with corresponding email', () => {
    expect(service.findUserByEmail(mockEmail)).resolves.toEqual(
      mockUserWithExp,
    );
  });

  it('Return user donations', () => {
    expect(service.findUserDonations(mockId, mockToken)).resolves.toEqual([
      mockDonation,
    ]);
  });

  it('Return user completed feats', () => {
    expect(service.findUserCompletedFeats(mockId, mockToken)).resolves.toEqual([
      {
        userId: 1,
        featId: 1,
        featName: 'Feat 1',
        featDescription: 'Description 1',
        achievedRanks: [],
        nextRanks: [],
      },
    ]);
  });

  it('Creates a new user', () => {
    expect(service.createUser(new CreateUserDto())).resolves.toEqual(mockUser);
  });

  it('Removes an user', async () => {
    await expect(service.removeUser(mockId, mockToken)).resolves.not.toThrow();

    expect(mockAuthService.isUserAuthorizedToAccessData).toHaveBeenCalledWith(
      mockId,
      mockToken,
    );
  });

  it('Updates user', () => {
    const username = 'foo';
    expect(
      service.updateUser(mockId, mockToken, { username }),
    ).resolves.toEqual({
      ...mockUserWithExp,
      username,
    });
  });

  it('Updates user email verification field', async () => {
    await expect(service.updateUserEmailVerification(mockId));
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      { id: mockId },
      { has_verified_email: true },
    );
  });
});
