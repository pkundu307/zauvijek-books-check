import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { ExpenseItem } from '../expense_item/expense_item.entity'

@Entity()
export class Expense {
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
    length: 128,
    nullable: true
  })
  category: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  expense_prefix: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  expense_no: string

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'opening_balance_date'
  })
  expense_date: Date

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'party_name'
  })
  party_name: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'payment_mode'
  })
  payment_mode: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'bank_cash_cheque_id'
  })
  bank_cash_cheque_id: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'payment_account'
  })
  payment_account: string

  @OneToMany(() => ExpenseItem, (expense_item) => expense_item.expense, {
    cascade: true
  })
  expense_item: ExpenseItem[]

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
    name: 'total_taxable_amount'
  })
  total_taxable_amount: number

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
    name: 'total_tax'
  })
  total_tax: number

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
    name: 'total_amount'
  })
  total_amount: number

  @Column({
    type: 'text',
    nullable: true,
    name: 'notes'
  })
  notes: string

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
}
