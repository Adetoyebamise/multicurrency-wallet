import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  UserEntity } from "./users/entities/user.entity";
import { WalletEntity } from './users/entities/wallet.entity';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or another database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'wallet',
      database: 'postgres',
      entities: [UserEntity, WalletEntity], // List of entities to be loaded
      synchronize: true, // Should be set to false in production
    }),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
