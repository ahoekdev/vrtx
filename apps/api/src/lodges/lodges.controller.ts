import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
