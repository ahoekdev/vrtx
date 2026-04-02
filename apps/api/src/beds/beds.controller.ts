import { Body, Controller, Get, Post } from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';

@Controller('beds')
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Get()
  findAll() {
    return this.bedsService.findAll();
  }

  @Post()
  create(@Body() body: CreateBedDto) {
    return this.bedsService.create(body);
  }
}
