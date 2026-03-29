import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LodgesController } from './lodges.controller';
import { LodgesService } from './lodges.service';

@Module({
  imports: [DatabaseModule],
  providers: [LodgesService],
  controllers: [LodgesController],
})
export class LodgesModule {}
