import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [DatabaseModule],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
