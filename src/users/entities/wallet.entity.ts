
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne
} from 'typeorm'

import { UserEntity } from './user.entity'

@Entity('wallets')
@Unique(['walletID'])
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({nullable: false})
  name?: string

  @Column({nullable: false})
  walletID?: string

  @Column({ name: 'address', type: 'text'})
  address?: string

  @Column({default: true})
  status?: boolean 

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user?: UserEntity

  @Column({nullable: false})
  currencyFlag?: string

  @Column({nullable: false})
  currency?: string
  
  @Column({nullable: false})
  balance?: string

  @Column({default: {}, type: 'json'})
  bank?: object

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}