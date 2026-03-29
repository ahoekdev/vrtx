import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from './helpers/create-test-app';

describe('UsersController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => (app = await createTestApp()));
  afterEach(async () => await app.close());

  it('/users (POST) returns field-specific validation errors for invalid input', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'not-an-email', role: 'admin' })
      .expect(400)
      .expect({
        message: 'Validation failed',
        errors: [
          {
            field: 'role',
            messages: ['property role should not exist'],
          },
          {
            field: 'email',
            messages: ['email must be a valid email address'],
          },
        ],
      });
  });
});
