import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTourStageDto } from './dto/create-tour-stage.dto';
import { TourStagesService } from './tour-stages.service';

@Controller('tour-stages')
export class TourStagesController {
  constructor(private readonly tourStagesService: TourStagesService) {}

  @Get()
  findAll() {
    return this.tourStagesService.findAll();
  }

  @Post()
  create(@Body() body: CreateTourStageDto) {
    return this.tourStagesService.create(body);
  }
}
