import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorParser {
  private readonly logger = new Logger(ErrorParser.name);

  parse(error: any) {
    if (error instanceof PrismaClientValidationError) {
      const errorDetails =
        error.message
          .split('\n')
          .slice(1)
          .map((line) => line.trim())
          .find((line) => line.includes('Argument')) ?? '';

      throw new HttpException(
        {
          message: `Invalid Data: ${errorDetails}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (error.code === 'P2025') {
      throw new HttpException(
        {
          message: `Not Found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        message: `Internal Server Error`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  handlePrismaError() {}
}
