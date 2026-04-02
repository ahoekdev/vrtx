import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { rooms } from '../database/schemas/rooms.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(rooms);
  }

  async create(body: CreateRoomDto) {
    const [room] = await this.databaseService.db
      .insert(rooms)
      .values({ ...body, price: body.price.toString() })
      .returning();

    return room;
  }
}
