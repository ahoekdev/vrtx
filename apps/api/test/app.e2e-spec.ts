import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { createTestApp } from './helpers/create-test-app';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => (app = await createTestApp()));
  afterEach(async () => await app.close());

  it('/ (GET) returns 404 when no root route is defined', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });
});
