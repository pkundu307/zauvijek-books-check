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
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  sale_item_id: string

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
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'batch_no'
  })
  batch_no: string

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'manufacture_date'
  })
  manufacture_date: Date

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'expiry_date'
  })
  expiry_date: Date

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
    length: 64,
    nullable: true,
    name: 'price_type'
  })
  price_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'unit'
  })
  unit: string

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
    name: 'discount_percent'
  })
  discount_percent: number

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
    name: 'discount_amount'
  })
  discount_amount: number

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
    name: 'taxable_amount'
  })
  taxable_amount: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax'
  })
  tax: string

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
    name: 'tax_amount'
  })
  tax_amount: number

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
    name: 'cess_amount'
  })
  cess_amount: number

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
    type: 'boolean',
    default: false,
    name: 'is_mrp_enabled'
  })
  is_mrp_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_wholesale_enabled'
  })
  is_wholesale_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_serialisation_enabled'
  })
  is_serialisation_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_batching_enabled'
  })
  is_batching_enabled: string

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
    name: 'selling_price'
  })
  selling_price: number

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'selling_price_type'
  })
  selling_price_type: string

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
    name: 'purchase_price'
  })
  purchase_price: number

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'purchase_price_type'
  })
  purchase_price_type: string

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
    name: 'mrp'
  })
  mrp: number

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
    name: 'wholesale_price'
  })
  wholesale_price: number

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'wholesale_price_type'
  })
  wholesale_price_type: string

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
    name: 'wholesale_quantity'
  })
  wholesale_quantity: number

  @ManyToOne(() => Sale, (sale) => sale.sale_item, {
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
