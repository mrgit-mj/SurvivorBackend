import { Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { SurvivorService } from 'src/survivor/survivor.service';

@Injectable()
export class StatsService {
  constructor(
    private itemService: ItemService,
    private survivorService: SurvivorService,
  ) {}

  async getInfectionPercentage() {
    const survivors = await this.survivorService.getSurvivors();

    const noOfSurvivors = survivors.length;
    const noOfInfected = survivors.filter(
      (sur) => sur.infected === true,
    ).length;
    const noOfNonInfected = noOfSurvivors - noOfInfected;

    const infectedPercentage = ((noOfInfected / noOfSurvivors) * 100).toFixed(
      2,
    );
    const nonInfectedPercentage = (
      (noOfNonInfected / noOfSurvivors) *
      100
    ).toFixed(2);

    const infectionPercentage = {
      infected: `${parseFloat(infectedPercentage)} %`,
      nonInfected: `${parseFloat(nonInfectedPercentage)} %`,
    };

    return infectionPercentage;
  }

  async getAverageItems() {
    const survivors = await this.survivorService.getSurvivors();
    const items = await this.itemService.getItems();

    const splitItems = {
      Water: [],
      Food: [],
      Medication: [],
      CVirusVaccineWater: [],
    };

    items.forEach((item) => {
      switch (item.type) {
        case 'Water':
          splitItems.Water.push(item);
          break;
        case 'Food':
          splitItems.Food.push(item);
          break;
        case 'Medication':
          splitItems.Medication.push(item);
          break;
        case 'CVirusVaccineWater':
          splitItems.CVirusVaccineWater.push(item);
          break;
        default:
          // Handle unknown item types
          break;
      }
    });

    const averages = {};
    Object.entries(splitItems).map(([key, value]) => {
      const average = value.length / survivors.length;
      averages[key] = average.toFixed(2);
    });

    return averages;
  }
}
