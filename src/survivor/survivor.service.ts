import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ErrorParser } from 'src/common/error-parser.service';

@Injectable()
export class SurvivorService {
  constructor(
    private prisma: PrismaService,
    private errorParser: ErrorParser,
  ) {}

  getSurvivors() {
    return this.prisma.survivor.findMany();
  }

  async getSurvivor(id: number) {
    try {
      const survivor = await this.prisma.survivor.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return survivor;
    } catch (error) {
      return this.errorParser.parse(error);
    }
  }

  async createSurvivor(dto: Prisma.SurvivorCreateInput) {
    try {
      const outcome = await this.prisma.survivor.create({
        data: dto,
      });

      return outcome;
    } catch (error) {
      return this.errorParser.parse(error);
    }
  }

  updateSurvivor(id: number, dto: Prisma.SurvivorUpdateInput) {
    return this.prisma.survivor.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  deleteSurvivor(id: number) {
    return this.prisma.survivor.delete({
      where: { id },
    });
  }
}
