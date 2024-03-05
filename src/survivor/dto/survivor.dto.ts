import { IsString, IsInt, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Item } from 'src/item/dto/item.dto';

export class Survivor {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsBoolean()
  infected: boolean;

  @IsArray()
  items: Item[];
}

export class CreateSurvivorDto extends Survivor {}
export class UpdateSurvivorDto extends PartialType(CreateSurvivorDto) {}
