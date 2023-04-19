import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ImageService } from './image.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ImageEntity } from './models/image.entity';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get Image',
    description: 'Tries to find a single image matching the given id.',
  })
  @ApiOkResponse({
    type: ImageEntity,
    description: 'Finds image with matching id',
  })
  @ApiNotFoundResponse({
    description: 'Image with given id does not exist',
  })
  getImage(@Param('id', ParseIntPipe) id: number): Promise<ImageEntity> {
    return this.imageService.findImageById(id);
  }
}
