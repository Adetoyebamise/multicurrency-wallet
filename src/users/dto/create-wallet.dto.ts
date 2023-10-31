import { 
  IsString, 
} from 'class-validator';
 
export class createWalletDto {
  @IsString() 
  name: string;

  @IsString() 
  walletID: string;

  @IsString() 
  address: string;

  @IsString() 
  userId: string;

  status: boolean;
  
  @IsString()
  user: string;

  @IsString()
  currency: string;

  @IsString()
  currencyFlag: string; 

  balance: string;

  bank: string;
}