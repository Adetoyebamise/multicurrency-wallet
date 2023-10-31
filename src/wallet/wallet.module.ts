import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/users/entities/wallet.entity';
import { Paystack } from 'src/services/paystack';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, UserEntity]),Repository],
  controllers: [WalletController],
  providers: [WalletService, Paystack, Repository]
})
export class WalletModule {}
