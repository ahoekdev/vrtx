import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestValidationPipe } from './pipes/request-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new RequestValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '::');
}

void bootstrap();
