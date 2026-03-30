import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BedsController } from './beds.controller';
import { BedsService } from './beds.service';

@Module({
  imports: [DatabaseModule],
  providers: [BedsService],
  controllers: [BedsController],
})
export class BedsModule {}
