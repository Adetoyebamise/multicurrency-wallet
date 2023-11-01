import { NotFoundException } from '@nestjs/common';

export class WalletCreationErrorException extends NotFoundException {
  constructor(error?: string) {
    super('wallet not Created!', error);
  }
}