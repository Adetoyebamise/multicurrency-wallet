
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { UserEntity } from './user.entity'

@Entity('wallets')
@Unique(['walletID'])
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({nullable: false})
  name?: string

  @Column({nullable: true})
  walletID?: string

  @Column({ name: 'address', type: 'text'})
  address?: string

  @Column({default: true})
  status?: boolean 

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity

  @Column({nullable: false})
  currencyFlag?: string

  @Column({nullable: false})
  currency?: string 

  @Column({ type: 'numeric', default: 0 }) 
  balance: number;

  @Column({default: {}, type: 'json'})
  bank?: object

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date 
}