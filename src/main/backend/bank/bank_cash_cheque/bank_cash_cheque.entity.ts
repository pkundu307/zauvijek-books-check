import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { BankCashChequeTransaction } from '../bank_cash_cheque_transaction/bank_cash_cheque_transaction.entity'

@Entity()
export class BankCashCheque {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'business_id'
  })
  business_id: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'account_type'
  })
  account_type: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'account_name'
  })
  account_name: string

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: {
      to(value) {
        return value
      },
      from(value) {
        return parseFloat(value)
      }
    },
    name: 'opening_balance'
  })
  opening_balance: number

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'opening_balance_date'
  })
  opening_balance_date: Date

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: {
      to(value) {
        return value
      },
      from(value) {
        return parseFloat(value)
      }
    },
    name: 'closing_balance'
  })
  closing_balance: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'bank_name'
  })
  bank_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'bank_account_no'
  })
  bank_account_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'bank_ifsc_code'
  })
  bank_ifsc_code: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'bank_account_holder_name'
  })
  bank_account_holder_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'upi_id'
  })
  upi_id: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_default'
  })
  is_default: boolean

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_enabled'
  })
  is_enabled: boolean

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date
  @OneToMany(() => BankCashChequeTransaction, (bank_cash_cheque_transaction) => bank_cash_cheque_transaction.bank_cash_cheque, {
    cascade: true
  })
  bank_cash_cheque_transaction: BankCashChequeTransaction[]
}
