import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './models/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async findImageById(id: number): Promise<ImageEntity> {
    const image = await this.imageRepository.findOneBy({ id });

    if (!image)
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);

    return image;
  }
}
