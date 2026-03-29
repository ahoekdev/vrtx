import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/database/database.service';
import { RequestValidationPipe } from '../../src/pipes/request-validation.pipe';

type DatabaseServerMock = {
  db: {
    select?: jest.Mock;
    insert?: jest.Mock;
  };
  onModuleDestroy: jest.Mock;
};

const createDatabaseServerMock = (
  overrides?: Partial<DatabaseServerMock>,
): DatabaseServerMock => ({
  db: {},
  onModuleDestroy: jest.fn(),
  ...overrides,
});

export async function createTestApp(
  databaseServiceOverrides?: Partial<DatabaseServerMock>,
): Promise<NestExpressApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DatabaseService)
    .useValue(createDatabaseServerMock(databaseServiceOverrides))
    .compile();

  return moduleFixture
    .createNestApplication<NestExpressApplication>()
    .useGlobalPipes(new RequestValidationPipe())
    .init();
}
