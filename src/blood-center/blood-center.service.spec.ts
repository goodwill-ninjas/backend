import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailEntity } from './models/blood-center-detail.entity';
import { BloodCenterService } from './blood-center.service';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';
import { ParsedBloodCenterDetailRequest } from './interfaces/parsed-blood-center-detail.request';

describe('DonationService', () => {
  const exampleBloodCenter = new BloodCenterEntity();
  const exampleParsedBloodCenterDetailRequest =
    [] as ParsedBloodCenterDetailRequest[];
  const exampleCity = 'Test City';

  let service: BloodCenterService;

  const mockBloodCenterRepository = {
    find: jest.fn().mockImplementation(() => {
      return [exampleBloodCenter];
    }),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValueOnce(exampleBloodCenter),
    })),
    save: jest.fn().mockImplementation(() => {
      return exampleParsedBloodCenterDetailRequest;
    }),
    findOneBy: jest.fn().mockImplementation(city => {
      return {
        city,
        ...exampleBloodCenter,
      };
    }),
  };
  const mockBloodCenterDetailRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloodCenterService,
        {
          provide: getRepositoryToken(BloodCenterEntity),
          useValue: mockBloodCenterRepository,
        },
        {
          provide: getRepositoryToken(BloodCenterDetailEntity),
          useValue: mockBloodCenterDetailRepository,
        },
      ],
    }).compile();

    service = module.get<BloodCenterService>(BloodCenterService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Finds all blood centers', () => {
    expect(service.findBloodCenters()).resolves.toEqual([exampleBloodCenter]);
  });

  it('Finds single Blood Center', () => {
    expect(service.findBloodCenterByCity(exampleCity)).resolves.toEqual(
      exampleBloodCenter,
    );
  });

  it('Saves Blood Center Details', async () => {
    const dto = {
      datetime_modified: '2023-04-02T12:30',
      url_src: 'https://test.url/',
      blood_banks: {
        Test_City: {
          '0 Rh-': 'STOP',
          '0 Rh+': 'ALMOST_FULL',
          'A Rh-': 'STOP',
          'A Rh+': 'OPTIMAL',
          'B Rh-': 'OPTIMAL',
          'B Rh+': 'CRITICAL',
          'AB Rh-': 'MODERATE',
          'AB Rh+': 'MODERATE',
        },
      },
    };
    await expect(
      service.saveBloodCenterDetails(<SaveBloodCenterDetailsDto>(<unknown>dto)),
    ).resolves.not.toThrow();
    expect(mockBloodCenterDetailRepository.create).toHaveBeenCalledTimes(8);
  });
});
