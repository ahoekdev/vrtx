import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { reservations } from '../database/schemas/reservations.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(reservations);
  }

  async create(body: CreateReservationDto) {
    const [reservation] = await this.databaseService.db
      .insert(reservations)
      .values(body)
      .returning();

    return reservation;
  }
}
