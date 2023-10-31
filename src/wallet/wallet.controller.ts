import { Controller, Get, Body, Post, Req, Res, HttpException} from '@nestjs/common';
import { WalletService } from "./wallet.service";
import { createWalletDto } from "./../users/dto/create-wallet.dto";
import { Request, Response } from 'express';
import { WalletNotFoundException } from 'src/errors';
import { Paystack } from 'src/services/paystack';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from 'src/users/entities/wallet.entity';

@Controller('wallet')
export class WalletController {
  constructor( @InjectRepository(UserEntity)
   private readonly userRepository: Repository<UserEntity>, 
   private readonly UserEntityRepository: Repository<UserEntity>, 
   private readonly WalletEntityRepository: Repository<WalletEntity>,
   private readonly WalletService: WalletService, 
   private readonly paystack: Paystack) {} 
  
  @Post()
  async create(@Body() createWalletDto: createWalletDto,  @Req() req:Request, @Res() res:Response) :Promise <any>{ 
   
    const walletData = await this.WalletService.createWallet(createWalletDto);
    console.log("wallet", walletData)
    return res.status(201).json({
      status: "success",
      message: "Wallet created successfully",
      data: walletData
    })
  }

  @Post('user/fund-wallet')
  async fundWallet( 
      @Body('email') email: string,
      @Body('amount') amount: string, 
      createWalletDto: createWalletDto,
      createUserDto: CreateUserDto, 
      @Req() req:Request, 
      @Res() res:Response,
  ) {
    // get the user email or card details from the req.user object
    console.log("email", email)

    const user = await this.userRepository.findOne({where: {email}});

    console.log("user", user)

    const ref = `funded-${Math.floor(Math.random() * 10000000 + 1)}-${user.id }`;
    console.log("ref", ref)
    const wallet = await this.WalletService.checkIfWalletExists({ where: { user: { id: user.id } }  });

    if (!wallet) throw new WalletNotFoundException(); // create a wallet here

    const initialization = await this.paystack.initializePayment({
      email,
      amount
    })
    console.log("initialization", initialization) 
    // if (initialization.status === "Authorization URL created") {
    //   return  res.status(201).json( initialization.data)
    // } else {
    //   throw new HttpException("Payment Initialization Failed", 500);
    // }
     // STEP 2
      const funded = await this.paystack.verifyPayment( {reference: initialization.data.reference });
      console.log("funded", funded)
      if (funded.success === true) {
        funded.status = 'Verification successful';
        wallet.balance = wallet.balance + Number((req.body.amount)/100);
        await this.WalletEntityRepository.save(wallet);;
  
        const transactionObj: object = {
          user: user.id,
          amount: req.body.amount,
          type: 'CREDIT',
          status: 'SUCCESS',
          reference: ref,
        };
        // await this.transactionsService.createTransaction(transactionObj);
        return { status: funded.success, message: funded.status, wallet };
      } else {
        throw new HttpException("something went wrong", 400);
      }
  }
  
}
