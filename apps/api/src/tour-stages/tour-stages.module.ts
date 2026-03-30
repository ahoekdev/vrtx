import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TourStagesController } from './tour-stages.controller';
import { TourStagesService } from './tour-stages.service';

@Module({
  imports: [DatabaseModule],
  providers: [TourStagesService],
  controllers: [TourStagesController],
})
export class TourStagesModule {}
