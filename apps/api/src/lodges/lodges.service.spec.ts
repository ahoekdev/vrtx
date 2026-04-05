import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { LodgesService } from './lodges.service';

describe('LodgesService', () => {
  let service: LodgesService;
  const db = {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LodgesService,
        {
          provide: DatabaseService,
          useValue: { db },
        },
      ],
    }).compile();

    service = module.get<LodgesService>(LodgesService);
  });

  it('soft deletes an active lodge', async () => {
    const activeLodgeQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValue([
              { id: '55d8071c-f460-4987-b3de-d5af7f0ac388' },
            ]),
        }),
      }),
    };
    const roomReferenceQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    };
    const stageReferenceQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    };
    const returning = jest
      .fn()
      .mockResolvedValue([{ id: '55d8071c-f460-4987-b3de-d5af7f0ac388' }]);
    const where = jest.fn().mockReturnValue({ returning });
    let deletedAt: Date | undefined;
    const set = jest.fn().mockImplementation((values: { deletedAt: Date }) => {
      deletedAt = values.deletedAt;
      return { where };
    });

    db.select
      .mockReturnValueOnce(activeLodgeQuery)
      .mockReturnValueOnce(roomReferenceQuery)
      .mockReturnValueOnce(stageReferenceQuery);
    db.update.mockReturnValue({ set });

    await service.remove('55d8071c-f460-4987-b3de-d5af7f0ac388');

    expect(db.update).toHaveBeenCalledTimes(1);
    expect(deletedAt).toBeInstanceOf(Date);
    expect(returning).toHaveBeenCalledTimes(1);
  });

  it('throws not found when the lodge does not exist', async () => {
    const activeLodgeQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    };

    db.select.mockReturnValue(activeLodgeQuery);

    await expect(
      service.remove('55d8071c-f460-4987-b3de-d5af7f0ac388'),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(db.update).not.toHaveBeenCalled();
  });

  it('throws conflict when the lodge is still referenced', async () => {
    const activeLodgeQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValue([
              { id: '55d8071c-f460-4987-b3de-d5af7f0ac388' },
            ]),
        }),
      }),
    };
    const roomReferenceQuery = {
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValue([
              { id: '3c49f9c0-d85e-4fb6-a159-c5e981df1efb' },
            ]),
        }),
      }),
    };

    db.select
      .mockReturnValueOnce(activeLodgeQuery)
      .mockReturnValueOnce(roomReferenceQuery);

    await expect(
      service.remove('55d8071c-f460-4987-b3de-d5af7f0ac388'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(db.update).not.toHaveBeenCalled();
  });
});
