import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './utils/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = swaggerConfig();
  const swaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions);
  await app.listen(3000);
}

bootstrap();
