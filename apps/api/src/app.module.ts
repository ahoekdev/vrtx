import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LodgesModule } from './lodges/lodges.module';
import { StagesModule } from './stages/stages.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    LodgesModule,
    StagesModule,
    ToursModule,
  ],
})
export class AppModule {}
