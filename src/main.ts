import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './utils/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = swaggerConfig();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('swagger', app, swaggerDocument, swaggerOptions);

  await app.listen(3000);
}

bootstrap();
