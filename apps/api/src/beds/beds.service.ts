import { Injectable } from '@nestjs/common';
import { beds } from '../database/schemas/beds.schema';
import { DatabaseService } from '../database/database.service';
import { CreateBedDto } from './dto/create-bed.dto';

@Injectable()
export class BedsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(beds);
  }

  async create(body: CreateBedDto) {
    const [bed] = await this.databaseService.db
      .insert(beds)
      .values(body)
      .returning();

    return bed;
  }
}
