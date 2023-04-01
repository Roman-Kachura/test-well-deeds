import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedCreateDto } from './dto/deed-create.dto';
import { DeedUpdateDto } from './dto/deed-update.dto';
import { DeedGetDto } from './dto/deed-get.dto';
import { DeedRemoveDto } from './dto/deed-remove.dto';

@Controller('deeds')
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {
  }

  @Post()
  createDeed(@Body() data: DeedCreateDto) {
    return this.deedsService.createDeed(data);
  }

  @Get('/:uid')
  getDeeds(@Param() data: DeedGetDto) {
    return this.deedsService.getDeeds(data);
  }

  @Put()
  updateDeed(@Body() data: DeedUpdateDto) {
    return this.deedsService.updateDeed(data);
  }

  @Delete('/:uid/:id')
  removeDeed(@Param() data: DeedRemoveDto) {
    return this.deedsService.removeDeed(data);
  }
}
