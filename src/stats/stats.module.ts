import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';
import { SurvivorService } from 'src/survivor/survivor.service';
import { SurvivorModule } from 'src/survivor/survivor.module';
import { PrismaService } from 'src/prisma.service';
import { ErrorParser } from 'src/common/error-parser.service';

@Module({
  imports: [ItemModule, SurvivorModule],
  controllers: [StatsController],
  providers: [
    StatsService,
    SurvivorService,
    ItemService,
    PrismaService,
    ErrorParser,
  ],
})
export class StatsModule {}
