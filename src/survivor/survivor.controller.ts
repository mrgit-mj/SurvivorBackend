import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { Prisma } from '@prisma/client';
import { ItemService } from 'src/item/item.service';

@Controller('survivor')
export class SurvivorController {
  constructor(
    private readonly survivorService: SurvivorService,
    private readonly itemService: ItemService,
  ) {}

  @Get()
  getSurvivors() {
    return this.survivorService.getSurvivors();
  }

  @Get(':id')
  getSurvivor(@Param('id') id: string) {
    return this.survivorService.getSurvivor(+id);
  }

  @Get(':id/items')
  getSurvivorItems(@Param('id') id: string) {
    return this.itemService.getItemsByOwner(+id);
  }

  @Post()
  createSurvivor(@Body() dto: Prisma.SurvivorCreateInput) {
    return this.survivorService.createSurvivor(dto);
  }

  @Delete()
  deleteSurvivor(@Query('id') id: string) {
    return this.survivorService.deleteSurvivor(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurvivorDto: Prisma.SurvivorUpdateInput,
  ) {
    return this.survivorService.updateSurvivor(+id, updateSurvivorDto);
  }
}
