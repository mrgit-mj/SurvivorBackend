import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { ErrorParser } from 'src/common/error-parser.service';
import { TradeItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private errorParser: ErrorParser,
  ) {}

  getItems() {
    return this.prisma.item.findMany();
  }

  async getItem(id: number) {
    try {
      const survivor = await this.prisma.item.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return survivor;
    } catch (error) {
      return this.errorParser.parse(error);
    }
  }

  getItemsByOwner(id: number) {
    return this.prisma.item.findMany({
      where: {
        survivorId: id,
      },
    });
  }

  async createItem(dto: Prisma.ItemCreateInput) {
    try {
      const outcome = await this.prisma.item.create({
        data: dto,
      });

      return outcome;
    } catch (error) {
      return this.errorParser.parse(error);
    }
  }

  updateItem(id: number, dto: Prisma.ItemUpdateInput) {
    return this.prisma.item.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async tradeItems({ from, to, items }: TradeItemDto) {
    try {
      await this.prisma.survivor
        .findFirstOrThrow({
          where: { id: from },
        })
        .catch(() => {
          throw new HttpException(
            `No Survivor Exists, id: ${from}`,
            HttpStatus.BAD_REQUEST,
          );
        });

      await this.prisma.item.updateMany({
        where: {
          id: { in: items },
        },
        data: {
          survivorId: to,
        },
      });

      const traded = await this.prisma.item.findMany({
        where: {
          AND: {
            id: { in: items },
            survivorId: to,
          },
        },
        select: {
          name: true,
          type: true,
          id: true,
        },
      });

      return {
        noItemsTraded: traded.length,
        itemsTraded: traded,
      };
    } catch (error) {
      throw new HttpException(
        'Failed To make the trade',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  deleteItem(): void {}
}
