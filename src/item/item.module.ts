import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PrismaService } from 'src/prisma.service';
import { ErrorParser } from 'src/common/error-parser.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService, PrismaService, ErrorParser],
  exports: [ItemService],
})
export class ItemModule {}
