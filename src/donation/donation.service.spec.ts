import { DonationService } from './donation.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DonationEntity } from './models/donation.entity';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('DonationService', () => {
  const exampleDonation = {
    user_id: 720,
    donated_type: 'whole',
    amount: 450,
    blood_pressure: '170/90',
    donated_at: '2002-02-02T22:22:22.22Z',
  };
  const exampleId = 1;

  let service: DonationService;

  const mockUserService = {
    findUserById: jest.fn(id => id),
  };
  const mockDonationRepository = {
    findOneBy: jest.fn().mockImplementation(id => {
      return {
        ...id,
        ...exampleDonation,
      };
    }),
    create: jest.fn().mockImplementation(dto => {
      return {
        id: exampleId,
        ...dto,
      };
    }),
    save: jest.fn().mockImplementation(dto => dto),
    softDelete: jest.fn().mockImplementation(() => {
      return { affected: 1 };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationService,
        UserService,
        {
          provide: getRepositoryToken(DonationEntity),
          useValue: mockDonationRepository,
        },
        EventEmitter2,
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    service = module.get<DonationService>(DonationService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find donation by id', () => {
    expect(service.findDonationById(exampleId)).resolves.toEqual({
      id: exampleId,
      ...exampleDonation,
    });
  });

  it('Should create donation', () => {
    expect(service.createDonation(exampleDonation)).resolves.toEqual({
      id: exampleId,
      user: 720,
      donated_type: 'whole',
      amount: 450,
      blood_pressure: '170/90',
      donated_at: '2002-02-02T22:22:22.22Z',
    });
  });

  it('Should remove donation', async () => {
    await expect(service.removeDonation(exampleId)).resolves.not.toThrow();
    expect(mockDonationRepository.softDelete).toHaveBeenCalledWith(exampleId);
  });
});
