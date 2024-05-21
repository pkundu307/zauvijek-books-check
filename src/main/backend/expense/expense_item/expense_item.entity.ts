import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { Expense } from '../expense/expense.entity'

@Entity()
export class ExpenseItem {
  @PrimaryGeneratedColumn('uuid')
  expense_item_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'item_id'
  })
  item_id: string

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    name: 'item_name'
  })
  item_name: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'item_description'
  })
  item_description: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'hsn_code'
  })
  hsn_code: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'sac_code'
  })
  sac_code: string

  @Column({
    type: 'int',
    default: 0,
    name: 'quantity'
  })
  quantity: number

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
    name: 'price'
  })
  price: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'unit'
  })
  unit: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax'
  })
  tax: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'cess'
  })
  cess: string

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
    name: 'amount'
  })
  amount: number

  @ManyToOne(() => Expense, (expense) => expense.expense_item, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'expense_id' })
  expense: Expense

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
