import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/infection')
  getInfection() {
    return this.statsService.getInfectionPercentage();
  }

  @Get('items')
  getItemStats() {
    return this.statsService.getAverageItems();
  }
}
