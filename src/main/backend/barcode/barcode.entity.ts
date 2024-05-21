import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Barcode {
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
    length: 256,
    nullable: true,
    name: 'business_name'
  })
  business_name: string

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    name: 'item_name'
  })
  item_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'item_code'
  })
  item_code: string

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'item_price'
  })
  item_price: number

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'discount_percent'
  })
  discount_percent: number

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'discount_amount'
  })
  discount_amount: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'item_color'
  })
  item_color: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'item_brand'
  })
  item_brand: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'item_dimension'
  })
  item_dimension: string

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'item_weight'
  })
  item_weight: number

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
