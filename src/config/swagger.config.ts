import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API NestJS')
  .setDescription('Description de mon API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Nest js project starter',
};