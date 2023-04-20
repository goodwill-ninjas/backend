import { ImageController } from './image.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { ImageEntity } from './models/image.entity';

describe('ImageController', () => {
  const exampleImage = new ImageEntity();
  const exampleId = 1;
  let controller: ImageController;

  const mockImageService = {
    findImageById: jest.fn(id => {
      return {
        id: id,
        ...exampleImage,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    })
      .overrideProvider(ImageService)
      .useValue(mockImageService)
      .compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Finds an image', () => {
    expect(controller.getImage(exampleId)).toEqual({
      id: exampleId,
      ...exampleImage,
    });
  });
});
