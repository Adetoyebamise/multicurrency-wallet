import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';


@Entity('Transactions')
export class TransactionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @Column({ default: 0 })
  amount: number;

  @Column({type:'enum', enum: ['DEBIT', 'CREDIT'] })
  type: string;

  @Column({type:'enum', enum:['PENDING', 'SUCCESS', 'FAILED']})
  status: string;

  @Column()
  reference: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}