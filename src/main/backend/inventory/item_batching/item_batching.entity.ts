import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { Item } from '../item/item.entity'

@Entity()
export class ItemBatching {
  @PrimaryGeneratedColumn('uuid')
  item_batching_id: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  batch_no: string

  @Column({
    type: 'float',
    nullable: true
  })
  selling_price: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  selling_price_type: string

  @Column({
    type: 'float',
    nullable: true
  })
  purchase_price: number

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_second_unit_enabled'
  })
  is_second_unit_enabled: boolean

  @Column({
    type: 'varchar',
    nullable: true
  })
  purchase_price_type: string

  @Column({
    type: 'float',
    nullable: true
  })
  mrp: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  unit: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  second_unit: string

  @Column({
    type: 'float',
    nullable: true
  })
  conversion_rate: number

  @Column({
    type: 'float',
    nullable: true
  })
  opening_stock: number

  @Column({
    type: 'datetime',
    nullable: true
  })
  opening_stock_date: Date

  @Column({
    type: 'float',
    nullable: true
  })
  closing_stock: number

  @Column({
    type: 'datetime',
    nullable: true
  })
  manufacture_date: Date

  @Column({
    type: 'datetime',
    nullable: true
  })
  expiry_date: Date

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updated_at: Date

  @ManyToOne(() => Item, (Item) => Item.item_batching)
  item: Item[]
}
