import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import {
  swaggerConfig,
  swaggerOptions,
} from './common/utilities/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const config = swaggerConfig();
  const swaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, swaggerDocument, swaggerOptions);

  await app.listen(3000);
}

bootstrap();
