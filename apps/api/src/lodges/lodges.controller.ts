import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateLodgeDto } from './dto/create-lodge.dto';
import { LodgesService } from './lodges.service';

@Controller('lodges')
export class LodgesController {
  constructor(private readonly lodgesService: LodgesService) {}

  @Get()
  findAll() {
    return this.lodgesService.findAll();
  }

  @Post()
  create(@Body() body: CreateLodgeDto) {
    return this.lodgesService.create(body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.lodgesService.remove(id);
  }
}
