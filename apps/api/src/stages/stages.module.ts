import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';

@Module({
  imports: [DatabaseModule],
  providers: [StagesService],
  controllers: [StagesController],
})
export class StagesModule {}
