import { DonationController } from './donation.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from './donation.service';
import * as fc from 'fast-check';
import { CreateDonationDto } from './dto/create-donation.dto';

describe('DonationController', () => {
  const exampleDonation = new CreateDonationDto();
  const exampleId = 1;
  const exampleAuthHeader = 'mock_token';

  let controller: DonationController;

  const mockDonationService = {
    findDonationById: jest.fn(id => {
      return {
        id,
        ...exampleDonation,
      };
    }),
    createDonation: jest.fn(dto => {
      return {
        id: fc.integer(),
        ...dto,
      };
    }),
    removeDonation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationController],
      providers: [DonationService],
    })
      .overrideProvider(DonationService)
      .useValue(mockDonationService)
      .compile();

    controller = module.get<DonationController>(DonationController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Finds a donation', () => {
    expect(controller.getDonation(exampleId, exampleAuthHeader)).toEqual({
      id: exampleId,
      ...exampleDonation,
    });
  });

  it('Creates a donation', () => {
    expect(
      controller.addDonation(exampleDonation, exampleAuthHeader),
    ).resolves.toEqual({
      id: fc.integer(),
      ...exampleDonation,
    });
  });

  it('Should delete a donation', async () => {
    await expect(
      controller.deleteDonation(exampleId, exampleAuthHeader),
    ).resolves.not.toThrow();
    expect(mockDonationService.removeDonation).toHaveBeenCalledWith(
      exampleId,
      exampleAuthHeader,
    );
  });
});
