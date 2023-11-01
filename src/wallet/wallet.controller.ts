import { Controller, Get, Body, Post, Req, Res, HttpException} from '@nestjs/common';
import { WalletService } from "./wallet.service";
import { createWalletDto } from "./../users/dto/create-wallet.dto";
import { Request, Response } from 'express';
import { InternalErrorException, WalletNotFoundException } from 'src/errors';
import { Paystack } from 'src/services/paystack';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from 'src/users/entities/wallet.entity';
import { TransactionsService } from "./../transactions/transactions.service";
import { UsersService } from "./../users/users.service";
import { InsufficientTokensException } from 'src/errors/insufficient-token';

@Controller('wallet')
export class WalletController {
  constructor( @InjectRepository(UserEntity)
  private readonly WalletEntityRepository: Repository<WalletEntity>,
  private readonly userRepository: Repository<UserEntity>, 
   private readonly UserEntityRepository: Repository<UserEntity>, 
   private readonly WalletService: WalletService, 
   private readonly TransactionsService: TransactionsService, 
   private readonly UsersService: UsersService,
   private readonly paystack: Paystack) {} 
  
  @Post('create-wallet')
    async create(
      @Body() createWalletDto: createWalletDto,  
      @Req() req:Request, 
      @Res() res:Response) :Promise <any> { 
        const user = await this.UsersService.findUserById(createWalletDto.userId);
        const walletData = await this.WalletService.createWallet(createWalletDto, user);
        
        return res.status(201).json({
          status: "success",
          message: "Wallet created successfully",
          data: walletData
      })
    }

  @Post('fund-wallet')
    async fundWallet( 
      @Body('email') email: string,
      @Body('amount') amount: string, 
      @Body('userId') userId: string, 
      @Body('walletId') walletId: string, 
      createWalletDto: createWalletDto,
      createUserDto: CreateUserDto, 
      @Req() req:Request, 
      @Res() res:Response)
    {
      const user = await this.WalletService.findWalletByUserId({ where: { user: { id: userId } } });
      const ref = `funded-${Math.floor(Math.random() * 10000000 + 1)}-${user.id }`;
      let wallet = await this.WalletService.checkIfWalletExists({ where: {id: walletId }  });
      console.log("wallett", wallet)
      if (!wallet) throw new WalletNotFoundException();

      const initialization = await this.paystack.initializePayment({ email, amount})
      /***********************************************************************************/
      const funded = await this.paystack.verifyPayment( {reference: initialization.data.reference });
      console.log("funded", funded)
      if (funded.success === true) {
        funded.status = 'Verification successful'; 
        wallet.balance = wallet.balance + Number((req.body.amount)/100);
        // await this.WalletEntityRepository.save(wallet);
  
        await this.TransactionsService.createTransaction({ user:  user.id, amount:  req.body.amount, type: "CREDIT", status:"SUCCESS", reference: ref});
        return funded ;
      }
      else {
        throw new HttpException("something went wrong", 400);
      }
    }

    @Post('send-money') 
    async sendMoney( 
        @Body('userId') userId: string,
        @Body('amountToSend') amountToSend: string, 
        @Body('senderWallet') senderWallet: string, 
        @Body('receiverWallet') receiverWallet: string, 
        createWalletDto: createWalletDto,
        createUserDto: CreateUserDto, 
        @Req() req:Request, 
        @Res() res:Response) 
      {
        try {
          // find the senders wallet id or user name id, get the user userId or card details from the req.user object
          console.log("userId", userId)
          const user = await this.WalletService.findWalletByUserId({ where: { user: { id: userId } } });
          console.log("user", user)

          const wallet = await this.WalletService.checkIfWalletExists({ where: { user: { id:senderWallet } }  });

          if (!wallet) throw new WalletNotFoundException(); 
          
          const funds = this.checkSufficientFunds(Number(amountToSend), user);
          if (!funds) throw new InsufficientTokensException()
          
          const receiverUser = await this.WalletService.findWalletByUserId({receiverWallet});
          const ref2 = `peer-transfer-credit-${receiverUser.id}`;
          const receiverWalletCheck = await this.WalletService.checkIfWalletExists({where: { user: { id: receiverUser.id } }});

          await this.updateWalletBalance(-Number(amountToSend), wallet);
          await this.updateWalletBalance(Number(amountToSend), receiverWalletCheck);

          return {
            status: 200,
            message: `Transfer completed!, you have successfully sent ${amountToSend} `,
            senderWallet,
          };
        } 
          catch (error) {
            throw new InternalErrorException(error.message);
          }
      }

    public checkSufficientFunds(amount: number, wallet: Partial<WalletEntity>): boolean {
          if (wallet.balance - amount < 100) {
              return false;
          }
          return true;
        }

    public async updateWalletBalance( amount: number, wallet: Partial<WalletEntity>): Promise<Partial<WalletEntity>> {
          wallet.balance += amount;
          await this.WalletEntityRepository.save(wallet);
          return wallet;
        }
  }
  
