import { Test, TestingModule } from '@nestjs/testing';
import { LodgesController } from './lodges.controller';
import { LodgesService } from './lodges.service';

describe('LodgesController', () => {
  let controller: LodgesController;
  const lodgesService = {
    findAll: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LodgesController],
      providers: [
        {
          provide: LodgesService,
          useValue: lodgesService,
        },
      ],
    }).compile();

    controller = module.get<LodgesController>(LodgesController);
  });

  it('delegates deletion to the service', async () => {
    await controller.remove('55d8071c-f460-4987-b3de-d5af7f0ac388');

    expect(lodgesService.remove).toHaveBeenCalledWith(
      '55d8071c-f460-4987-b3de-d5af7f0ac388',
    );
  });
});
