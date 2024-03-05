import { Module } from '@nestjs/common';
import { SurvivorController } from './survivor.controller';
import { SurvivorService } from './survivor.service';
import { PrismaService } from 'src/prisma.service';
import { ErrorParser } from 'src/common/error-parser.service';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';

@Module({
  imports: [ItemModule],
  controllers: [SurvivorController],
  providers: [SurvivorService, PrismaService, ErrorParser, ItemService],
  exports: [SurvivorService],
})
export class SurvivorModule {}
