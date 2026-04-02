import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { DatabaseService } from '../database/database.service';
import { tours } from '../database/schemas/tours.schema';
import { CreateTourDto } from './dto/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(tours);
  }

  async create(body: CreateTourDto) {
    const slug = slugify(body.name, { lower: true, strict: true, trim: true });

    const [tour] = await this.databaseService.db
      .insert(tours)
      .values({ ...body, slug })
      .returning();

    return tour;
  }
}
