import { Test, TestingModule } from '@nestjs/testing';
import { FeatController } from './feat.controller';
import { FeatService } from './feat.service';
import { FeatEntity } from './models/feat.entity';

describe('FeatController', () => {
  const exampleFeat = new FeatEntity();
  let controller: FeatController;

  const mockFeatService = {
    findFeats: jest.fn(() => {
      return [exampleFeat];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatController],
      providers: [FeatService],
    })
      .overrideProvider(FeatService)
      .useValue(mockFeatService)
      .compile();

    controller = module.get<FeatController>(FeatController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Returns array of feats', () => {
    expect(controller.getAllFeats()).resolves.toEqual([exampleFeat]);
  });
});
