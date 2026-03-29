import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/database/database.service';
import { RequestValidationPipe } from '../../src/pipes/request-validation.pipe';

const createDatabaseServerMock = () => ({
  db: {},
  onModuleDestroy: jest.fn(),
});

export async function createTestApp(): Promise<NestExpressApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DatabaseService)
    .useValue(createDatabaseServerMock())
    .compile();

  return moduleFixture
    .createNestApplication<NestExpressApplication>()
    .useGlobalPipes(new RequestValidationPipe())
    .init();
}
