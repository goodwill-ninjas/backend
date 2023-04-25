import { ImageService } from './image.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImageEntity } from './models/image.entity';

describe('ImageService', () => {
  const exampleImage = new ImageEntity();
  const exampleId = 1;
  let service: ImageService;

  const mockImageRepository = {
    findOneBy: jest.fn().mockImplementation(id => {
      return {
        ...id,
        ...exampleImage,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(ImageEntity),
          useValue: mockImageRepository,
        },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Finds single Image', () => {
    expect(service.findImageById(exampleId)).resolves.toEqual({
      id: exampleId,
      ...exampleImage,
    });
  });
});
