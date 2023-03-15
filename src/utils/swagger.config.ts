import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const swaggerConfig = (): Omit<OpenAPIObject, 'paths'> => {
  return new DocumentBuilder()
    .setTitle('Blood Donor API')
    .setDescription('API documentation for the Blood Donor Mobile App')
    .setVersion('0.1')
    .build();
};

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Blood Donor API',
  useGlobalPrefix: true,
};
