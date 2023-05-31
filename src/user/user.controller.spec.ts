import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserWithExperienceDetails } from './dto/user-with-experience-details.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DonationEntity } from '../donation/models/donation.entity';
import { UserCompletedFeat } from './dto/user-completed-feat.dto';
import { UserEntity } from './models/user.entity';

describe('UserController', () => {
  const mockToken = 'mock_token';
  const mockDonation = new DonationEntity();
  const mockUserFeat = new UserCompletedFeat();
  const mockUser = new UserEntity();
  const mockUserWithExp = new UserWithExperienceDetails();
  const mockId = 1;
  mockUserWithExp.id = mockId;

  let controller: UserController;
  const mockUserService = {
    findUsers: jest.fn(() => [mockUser]),
    findUserById: jest.fn((id: number) => {
      if (id === mockUserWithExp.id) return mockUserWithExp;
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }),
    findUserDonations: jest.fn(() => [mockDonation]),
    findUserCompletedFeats: jest.fn(() => [mockUserFeat]),
    removeUser: jest.fn(),
    updateUser: jest.fn(
      (_id: number, _mockToken: string, body: { username: string }) => {
        mockUserWithExp.username = body.username;
        return mockUserWithExp;
      },
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Returns a list of all users', () => {
    expect(controller.getAllUsers()).resolves.toEqual([mockUser]);
  });

  it('If exists, returns an user with corresponding id', () => {
    expect(controller.getUser(mockId, mockToken)).resolves.toEqual(
      mockUserWithExp,
    );
  });

  it('Throws error if user with given id does not exist', () => {
    const throwableId = 9;
    expect(controller.getUser(throwableId, mockToken)).rejects.toThrow(
      'User not found',
    );
  });

  it('Returns user donations', () => {
    expect(controller.getUserDonations(mockId, mockToken)).resolves.toEqual([
      mockDonation,
    ]);
  });

  it('Returns user feats', () => {
    expect(controller.getUserFeats(mockId, mockToken)).resolves.toEqual([
      mockUserFeat,
    ]);
  });

  it('Removes user', async () => {
    await expect(
      controller.deleteUser(mockId, mockToken),
    ).resolves.not.toThrow();

    expect(mockUserService.removeUser).toHaveBeenCalledWith(mockId, mockToken);
  });

  it('Updates user details', () => {
    const username = 'foo';
    expect(
      controller.patchUser(mockId, mockToken, { username }),
    ).resolves.toEqual({
      ...mockUserWithExp,
      username,
    });
  });
});
