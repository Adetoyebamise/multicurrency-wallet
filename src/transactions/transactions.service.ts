import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TransactionsEntity } from './../users/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private TransactionsRepository: Repository<TransactionsEntity>,
  ) {}
  async createTransaction(payload:{ user: string, amount: any, type: string, status:string, reference: string}): Promise<TransactionsEntity> {
    try {
      let transaction: TransactionsEntity = new TransactionsEntity();
      transaction.id = payload.user;
      transaction.amount = payload.amount;
      transaction.type = payload.type;
      transaction.status = payload.status;
      transaction.reference = payload.reference;

      return await this.TransactionsRepository.save(transaction);
    } catch (err: any) {
      console.error(err);
      throw new HttpException(err.message, 500);
    }
  }

  async viewUserTransactions(userId: object): Promise<TransactionsEntity[]> {
    try {
      const userTransactions = await this.TransactionsRepository.find(userId);
      if (!userTransactions.length) {
        throw new HttpException('No transactions found', 404);
      }
      return userTransactions;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteUserTransaction(id: string): Promise<TransactionsEntity> {
    try { 
  
      const deletedTransaction = await this.TransactionsRepository.findOne( {where: {id}});
      if (!deletedTransaction) {
        throw new HttpException('Transaction not found', 404);
      }
      return await this.TransactionsRepository.remove(deletedTransaction);
      // return "transaction deleted successfully!"
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}