import type { Express } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { createTestApp } from './helpers/create-test-app';

describe('LodgesController (e2e)', () => {
  let app: NestExpressApplication;

  const getHttpApp = (nestApp: NestExpressApplication): Express =>
    nestApp.getHttpAdapter().getInstance();

  beforeEach(async () => (app = await createTestApp()));
  afterEach(async () => await app.close());

  it('/lodges (GET) returns active lodges', async () => {
    await app.close();

    const lodges = [
      {
        id: '55d8071c-f460-4987-b3de-d5af7f0ac388',
        name: 'Refuge A',
        country: 'France',
        keeperId: '9ad9a4f2-f33f-4875-bd0e-6d0d0ea6cb66',
        slug: 'refuge-a',
        deletedAt: null,
      },
    ];
    const where = jest.fn().mockResolvedValue(lodges);
    const from = jest.fn().mockReturnValue({ where });
    const select = jest.fn().mockReturnValue({ from });

    app = await createTestApp({
      db: { select },
    });

    const response = await request(getHttpApp(app)).get('/lodges').expect(200);

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(lodges);
  });

  it('/lodges/:id (DELETE) soft deletes a lodge', async () => {
    await app.close();

    const select = jest
      .fn()
      .mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest
              .fn()
              .mockResolvedValue([
                { id: '55d8071c-f460-4987-b3de-d5af7f0ac388' },
              ]),
          }),
        }),
      })
      .mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      })
      .mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });
    const returning = jest
      .fn()
      .mockResolvedValue([{ id: '55d8071c-f460-4987-b3de-d5af7f0ac388' }]);
    const where = jest.fn().mockReturnValue({ returning });
    let deletedAt: Date | undefined;
    const set = jest.fn().mockImplementation((values: { deletedAt: Date }) => {
      deletedAt = values.deletedAt;
      return { where };
    });
    const update = jest.fn().mockReturnValue({ set });

    app = await createTestApp({
      db: { select, update },
    });

    await request(getHttpApp(app))
      .delete('/lodges/55d8071c-f460-4987-b3de-d5af7f0ac388')
      .expect(204);

    expect(update).toHaveBeenCalledTimes(1);
    expect(deletedAt).toBeInstanceOf(Date);
  });

  it('/lodges/:id (DELETE) rejects invalid UUIDs', () => {
    return request(getHttpApp(app)).delete('/lodges/not-a-uuid').expect(400);
  });

  it('/lodges/:id (DELETE) returns 404 for an unknown lodge', async () => {
    await app.close();

    const select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    });

    app = await createTestApp({
      db: { select },
    });

    await request(getHttpApp(app))
      .delete('/lodges/55d8071c-f460-4987-b3de-d5af7f0ac388')
      .expect(404);
  });
});
