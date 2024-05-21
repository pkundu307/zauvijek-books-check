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
export class SaleAdditionalCharge {
  @PrimaryGeneratedColumn('uuid')
  sale_additional_charge_id: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'type'
  })
  name: string

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

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax'
  })
  tax: string

  @ManyToOne(() => Sale, (sale) => sale.sale_additional_charge, {
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
