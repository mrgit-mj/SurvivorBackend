import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';
import { TradeItemDto } from './dto/item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getItems() {
    return this.itemService.getItems();
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemService.getItem(+id);
  }

  @Post()
  createItem(@Body() dto: Prisma.ItemCreateInput) {
    return this.itemService.createItem(dto);
  }

  @Delete()
  deleteItem() {
    return this.itemService.deleteItem();
  }

  @Patch('/trade')
  tradeItem(@Body() dto: TradeItemDto) {
    return this.itemService.tradeItems(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: Prisma.ItemUpdateInput,
  ) {
    return this.itemService.updateItem(+id, updateItemDto);
  }
}
