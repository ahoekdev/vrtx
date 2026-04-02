import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { stages } from '../database/schemas/stages.schema';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(stages);
  }

  async create(body: CreateStageDto) {
    const [stage] = await this.databaseService.db
      .insert(stages)
      .values(body)
      .returning();

    return stage;
  }
}
