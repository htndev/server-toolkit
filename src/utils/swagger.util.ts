import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from '../providers/config/app.config';

export async function setupSwagger(app: INestApplication, packageConfig: Record<string, string>): Promise<void> {
  const logger = new Logger('Swagger');
  const config = app.get(AppConfig);

  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version || '')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  logger.verbose(`Swagger documentation available on route ${config.url}/docs`);
}
