import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/users/entities/wallet.entity';
import { Paystack } from 'src/services/paystack';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { TransactionsEntity } from 'src/users/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, UserEntity, TransactionsEntity]),Repository],
  controllers: [WalletController],
  providers: [WalletService, TransactionsService, UsersService, Paystack, Repository]
})
export class WalletModule {}
