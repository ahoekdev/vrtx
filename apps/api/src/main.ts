import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestValidationPipe } from './pipes/request-validation.pipe';

async function bootstrap() {
  const databaseEnvKeys = Object.keys(process.env)
    .filter((key) => key.includes('DATABASE'))
    .slice(0, 10);

  console.log('DATABASE_URL present:', Boolean(process.env.DATABASE_URL));
  console.log('database env keys:', databaseEnvKeys);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new RequestValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
