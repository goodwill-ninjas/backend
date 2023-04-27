import { DonationController } from './donation.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from './donation.service';
import * as fc from 'fast-check';

describe('DonationController', () => {
  const exampleDonation = {
    user_id: 720,
    donated_type: 'whole',
    amount: 450,
    blood_pressure: '170/90',
    donated_at: '2002-02-02T22:22:22.22Z',
  };
  const exampleId = 1;

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
    expect(controller.getDonation(exampleId)).toEqual({
      id: exampleId,
      ...exampleDonation,
    });
  });

  it('Creates a donation', () => {
    expect(controller.addDonation(exampleDonation)).resolves.toEqual({
      id: fc.integer(),
      ...exampleDonation,
    });
  });

  it('Should delete a donation', async () => {
    await expect(controller.deleteDonation(exampleId)).resolves.not.toThrow();
    expect(mockDonationService.removeDonation).toHaveBeenCalledWith(exampleId);
  });
});
