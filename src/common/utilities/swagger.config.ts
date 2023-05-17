import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const swaggerConfig = (): Omit<OpenAPIObject, 'paths'> => {
  return new DocumentBuilder()
    .setTitle('Blood Donor API')
    .setDescription('Documentation for the Blood Donor Backend API')
    .setVersion('0.9.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
};

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Blood Donor API',
  useGlobalPrefix: true,
};
