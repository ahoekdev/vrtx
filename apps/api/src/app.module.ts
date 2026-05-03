import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BedsModule } from './beds/beds.module';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './database/database.module';
import { LodgesModule } from './lodges/lodges.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { StagesModule } from './stages/stages.module';
import { TourStagesModule } from './tour-stages/tour-stages.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';

const databaseEnvKeys = Object.keys(process.env)
  .filter((key) => key.includes('DATABASE'))
  .slice(0, 10);

console.log('DATABASE_URL present:', Boolean(process.env.DATABASE_URL));
console.log('database env keys:', databaseEnvKeys);

@Module({
  imports: [
    ConfigModule.forRoot(),
    BedsModule,
    BookingsModule,
    DatabaseModule,
    UsersModule,
    LodgesModule,
    ReservationsModule,
    RoomsModule,
    StagesModule,
    TourStagesModule,
    ToursModule,
  ],
})
export class AppModule {}
