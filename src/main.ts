import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties:false,
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
