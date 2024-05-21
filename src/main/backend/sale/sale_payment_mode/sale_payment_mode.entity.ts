import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Sale } from '../sale/sale.entity'

@Entity()
export class SalePaymentMode {
  @PrimaryGeneratedColumn('uuid')
  sale_payment_mode_id: string

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
    name: 'account_name'
  })
  account_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_mode'
  })
  payment_mode: string

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

  @ManyToOne(() => Sale, (sale) => sale.sale_payment_mode, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale

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
