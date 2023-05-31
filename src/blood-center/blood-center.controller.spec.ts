import { Test, TestingModule } from '@nestjs/testing';
import { BloodCenterController } from './blood-center.controller';
import { BloodCenterService } from './blood-center.service';
import { BloodCenterEntity } from './models/blood-center.entity';
import { BloodCenterDetailEntity } from './models/blood-center-detail.entity';
import { SaveBloodCenterDetailsDto } from './dto/save-blood-center-details.dto';

describe('BloodCenterController', () => {
  const exampleBloodCenter = new BloodCenterEntity();
  const exampleBloodCenterDetails = new BloodCenterDetailEntity();
  const exampleCity = 'Test City';
  const exampleAuthHeader = 'mock_token';

  let controller: BloodCenterController;

  const mockBloodCenterService = {
    findBloodCenters: jest.fn(() => {
      return [exampleBloodCenter];
    }),
    saveBloodCenterDetails: jest.fn(),
    findBloodCenterByCity: jest.fn(city => {
      return {
        city: city,
        blood_center_details: exampleBloodCenterDetails,
        ...exampleBloodCenter,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodCenterController],
      providers: [BloodCenterService],
    })
      .overrideProvider(BloodCenterService)
      .useValue(mockBloodCenterService)
      .compile();

    controller = module.get<BloodCenterController>(BloodCenterController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Returns all Blood Centers', () => {
    expect(controller.getAllBloodCenters()).resolves.toEqual([
      exampleBloodCenter,
    ]);
  });

  it('Saves Blood Bank capacities', async () => {
    const dto = new SaveBloodCenterDetailsDto();
    await expect(
      controller.createBloodDetailStatus(dto, exampleAuthHeader),
    ).resolves.not.toThrow();
    expect(mockBloodCenterService.saveBloodCenterDetails).toHaveBeenCalledWith(
      dto,
      exampleAuthHeader,
    );
  });

  it('Finds a Blood Center', () => {
    expect(controller.getBloodCenter(exampleCity)).resolves.toEqual({
      city: exampleCity,
      blood_center_details: exampleBloodCenterDetails,
      ...exampleBloodCenter,
    });
  });
});
