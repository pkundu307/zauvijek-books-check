import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class stock_activity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: number

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'item_id'
  })
  item_id: number

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'activity_type',
    length: 128
  })
  activity_type: string

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
    name: 'invoice_prefix'
  })
  invoice_prefix: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'invoice_no'
  })
  invoice_no: number

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'quantity'
  })
  quantity: number

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'closing_stock'
  })
  closing_stock: number

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
