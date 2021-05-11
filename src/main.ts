import { readFileSync, existsSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpsOptions = {};
  if (existsSync('/etc/ssl/certs/nginx-selfsigned.crt')) {
    httpsOptions['key'] = readFileSync('/etc/ssl/private/nginx-selfsigned.key');
    httpsOptions['cert'] = readFileSync('/etc/ssl/certs/nginx-selfsigned.crt');
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
}

bootstrap().then(() => ({}));
