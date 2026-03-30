import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { StagesService } from './stages.service';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }

  @Post()
  create(@Body() body: CreateStageDto) {
    return this.stagesService.create(body);
  }
}
