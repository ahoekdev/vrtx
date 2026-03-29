import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from './helpers/create-test-app';

describe('UsersController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => (app = await createTestApp()));
  afterEach(async () => await app.close());

  it('/users (GET) returns users', async () => {
    await app.close();

    const users = [
      {
        id: '9ad9a4f2-f33f-4875-bd0e-6d0d0ea6cb66',
        email: 'ada@example.com',
        createdAt: '2026-03-29T10:00:00.000Z',
        updatedAt: '2026-03-29T10:00:00.000Z',
      },
    ];
    const from = jest.fn().mockResolvedValue(users);
    const select = jest.fn().mockReturnValue({ from });

    app = await createTestApp({
      db: { select },
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(users);
  });

  it('/users (POST) creates a user', async () => {
    await app.close();

    const createdUser = {
      id: '55d8071c-f460-4987-b3de-d5af7f0ac388',
      email: 'grace@example.com',
      createdAt: '2026-03-29T10:00:00.000Z',
      updatedAt: '2026-03-29T10:00:00.000Z',
    };
    const returning = jest.fn().mockResolvedValue([createdUser]);
    const values = jest.fn().mockReturnValue({ returning });
    const insert = jest.fn().mockReturnValue({ values });

    app = await createTestApp({
      db: { insert },
    });

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ email: createdUser.email })
      .expect(201);

    expect(insert).toHaveBeenCalledTimes(1);
    expect(values).toHaveBeenCalledWith({ email: createdUser.email });
    expect(returning).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(createdUser);
  });

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
