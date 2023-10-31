import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany
} from 'typeorm'
import { WalletEntity } from './wallet.entity'

@Entity('users')
 @Unique(['phone'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({nullable: true})
    title?: string

    @Column({nullable: true})
    firstName?: string

    @Column({nullable: true})
    phone?: string

    @Column({nullable: true})
    dateOfBirth?: string

    @Column({nullable: true})
    email?: string

    @Column({nullable: false})
    password?: string

    @Column("text", { nullable: true, array: true })
    pendingTransfer?: string[];

    @Column({
      type: 'enum',
      enum: ['user', 'admin'],  
      nullable: false
    })
    type?: string

    @OneToMany(() => WalletEntity, (wallet) => wallet.user)
    wallets?: WalletEntity[]

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}