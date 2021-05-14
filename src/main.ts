import { existsSync, readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpsOptions = {};

  if (
    existsSync(
      '/etc/letsencrypt/live/dashboard.easymeditation.co/fullchain.pem',
    )
  ) {
    httpsOptions['key'] = readFileSync(
      '/etc/letsencrypt/live/dashboard.easymeditation.co/privkey.pem',
    );
    httpsOptions['cert'] = readFileSync(
      '/etc/letsencrypt/live/dashboard.easymeditation.co/fullchain.pem',
    );
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
}

bootstrap().then(() => ({}));
