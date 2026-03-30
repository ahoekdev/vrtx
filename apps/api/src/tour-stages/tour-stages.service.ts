import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { tourStages } from '../database/schemas/tour-stages.schema';
import { CreateTourStageDto } from './dto/create-tour-stage.dto';

@Injectable()
export class TourStagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(tourStages);
  }

  async create(body: CreateTourStageDto) {
    const [tourStage] = await this.databaseService.db
      .insert(tourStages)
      .values(body)
      .returning();

    return tourStage;
  }
}
