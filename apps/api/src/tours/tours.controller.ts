import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Post()
  create(@Body() body: CreateTourDto) {
    return this.toursService.create(body);
  }
}
