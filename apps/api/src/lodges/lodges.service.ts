import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull, or } from 'drizzle-orm';
import slugify from 'slugify';
import { DatabaseService } from '../database/database.service';
import { lodges } from '../database/schemas/lodges.schema';
import { rooms } from '../database/schemas/rooms.schema';
import { stages } from '../database/schemas/stages.schema';
import { CreateLodgeDto } from './dto/create-lodge.dto';

@Injectable()
export class LodgesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db
      .select()
      .from(lodges)
      .where(isNull(lodges.deletedAt));
  }

  async create(body: CreateLodgeDto) {
    const slug = slugify(body.name, { lower: true, strict: true, trim: true });

    const [lodge] = await this.databaseService.db
      .insert(lodges)
      .values({ ...body, slug })
      .returning();

    return lodge;
  }

  async remove(id: string): Promise<void> {
    const [lodge] = await this.databaseService.db
      .select({ id: lodges.id })
      .from(lodges)
      .where(and(eq(lodges.id, id), isNull(lodges.deletedAt)))
      .limit(1);

    if (!lodge) {
      throw new NotFoundException('Lodge not found');
    }

    const [roomReference] = await this.databaseService.db
      .select({ id: rooms.id })
      .from(rooms)
      .where(eq(rooms.lodgeId, id))
      .limit(1);

    const [stageReference] = await this.databaseService.db
      .select({ id: stages.id })
      .from(stages)
      .where(or(eq(stages.fromLodgeId, id), eq(stages.toLodgeId, id)))
      .limit(1);

    if (roomReference || stageReference) {
      throw new ConflictException(
        'Lodge cannot be deleted while it is still in use',
      );
    }

    const [deletedLodge] = await this.databaseService.db
      .update(lodges)
      .set({ deletedAt: new Date() })
      .where(and(eq(lodges.id, id), isNull(lodges.deletedAt)))
      .returning({ id: lodges.id });

    if (!deletedLodge) {
      throw new NotFoundException('Lodge not found');
    }
  }
}
