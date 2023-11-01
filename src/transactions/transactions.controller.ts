import { Controller, UseGuards, Param, Delete, Get, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UsersService } from 'src/users/users.service'; 
import { TransactionsEntity } from './../users/entities/transaction.entity';
import { Request } from 'express';
import { UserDecorator } from 'src/users/decorator/user.decorator';


@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionService: TransactionsService,
    private userService: UsersService,
  ) {}

  @Get('user')
  async getUserTransactions(@UserDecorator() user: any,
  ): Promise<TransactionsEntity[] | string> {
    return await this.transactionService.viewUserTransactions({  where: { user: { id: user.userId } }, });
  }

  @Delete('delete/:id')
  async deleteUserTransaction(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<string> {
    await this.transactionService.deleteUserTransaction(id);
    return 'transaction deleted successfully';
  }
}