import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'https://cichy380.github.io'}); // only requests from this "origin" will be allowed
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Server is running on: ${await app.getUrl()}`
  );
}

bootstrap();
