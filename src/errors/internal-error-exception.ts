import { NotFoundException } from '@nestjs/common';

export class InternalErrorException extends NotFoundException {
  constructor(error?: string) {
    super('wallet not Found!', error);
  }
}