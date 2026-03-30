import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
  imports: [DatabaseModule],
  providers: [ToursService],
  controllers: [ToursController],
})
export class ToursModule {}
