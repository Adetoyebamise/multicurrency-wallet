import { HttpException, Injectable, Req, Res } from '@nestjs/common';
import { WalletEntity } from "./../users/entities/wallet.entity";
import { FindOneOptions, FindOperator, Repository } from 'typeorm';
import { createWalletDto } from "./../users/dto/create-wallet.dto"; 
import { AlphaNumeric } from 'src/lib/helper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from 'src/errors';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class WalletService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(@InjectRepository(WalletEntity)  
    private readonly userRepository: Repository<UserEntity>,
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly WalletEntityRepository: Repository<WalletEntity>) {}

  /**
   * this is function is used to create wallet in wallet Entity.
   * @param createWalletDto this will type of createWalletDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of wallet
   */
  async createWallet(createWalletDto: createWalletDto): Promise<WalletEntity> {
    const userData = await this.userRepository.findOne({ where: { id: createWalletDto.userId } });
console.log("userDaata", userData)
    // let findObject: {
    //   status?: string | FindOperator<string> | undefined;
    //   userId: string;
    // } = {  user: createWalletDto.user};

  //   let findObject: FindOneOptions<WalletEntity> = {
  //     where: {
  //         user: user,
  //         status: createWalletDto.status,
  //     }
  // };
  if (!userData) {
    // Handle the case when the user does not exist
    throw new UserNotFoundException();
  }
    // const existingWallet = await this.walletRepository.findOne( {
    //   where: { 
    //     user: userData
    //   },
    // });

    // if (existingWallet) {
    //   console.log("error", `Data: {}, Message: Wallet Exists`);
    //   throw new UserNotFoundException()
    // } 
    
    // const user = await this.userRepository.findOne({ where: { id: createWalletDto.userId} });
    const walletID = `funded-${Math.floor(Math.random() * 10000000 + 1)}-${userData.id}`;
    const address = AlphaNumeric(13, "alpha");

    const wallet: WalletEntity = new WalletEntity();
    wallet.name = createWalletDto.name;
    wallet.walletID = walletID;
    wallet.address = address;
    wallet.user = userData;
    wallet.currency = createWalletDto.currency;
    wallet.currencyFlag = createWalletDto.currencyFlag;

    return this.WalletEntityRepository.save(wallet);
  }

  
  async checkIfWalletExists(obj: object): Promise< WalletEntity> {
    try {
      return await this.WalletEntityRepository.findOne(obj);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 500);
    }
  }
}
