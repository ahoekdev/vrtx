import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { DatabaseService } from '../database/database.service';
import { lodges } from '../database/schemas/lodges.schema';
import { CreateLodgeDto } from './dto/create-lodge.dto';

@Injectable()
export class LodgesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(lodges);
  }

  async create(body: CreateLodgeDto) {
    const slug = slugify(body.name, { lower: true, strict: true, trim: true });

    const [lodge] = await this.databaseService.db
      .insert(lodges)
      .values({ ...body, slug })
      .returning();

    return lodge;
  }
}
