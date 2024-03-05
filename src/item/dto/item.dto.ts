import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum ItemType {
  Water,
  Food,
  Medication,
  CVirusVaccineWater,
}

export class Item {
  @IsNumber()
  id: number;

  @IsEnum(ItemType)
  type: ItemType;

  @IsString()
  describtion: string;

  @IsNumber()
  survivorId: string;
}

export class TradeItemDto {
  from: number;
  to: number;
  items: [];
}
