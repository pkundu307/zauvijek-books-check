import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Purchase } from '../purchase/purchase.entity'

@Entity()
export class PurchaseAdditionalCharge {
  @PrimaryGeneratedColumn('uuid')
  purchase_additional_charge_id: string

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

  @ManyToOne(() => Purchase, (purchase) => purchase.purchase_additional_charge, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase

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
