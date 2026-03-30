import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { bookings } from '../database/schemas/bookings.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(bookings);
  }

  async create(body: CreateBookingDto) {
    const [booking] = await this.databaseService.db
      .insert(bookings)
      .values(body)
      .returning();

    return booking;
  }
}
