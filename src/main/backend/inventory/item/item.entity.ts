import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity
} from 'typeorm'

// import { FileStorage } from 'src/file_storage/entities/file_storage.entity'
import { ItemBatching } from '../item_batching/item_batching.entity'
import { ItemSerialisation } from '../item_serialisation/item_serialisation.entity'

export interface ICustomField {
  field_type: string
  field_form_type: string
  field_label: string
  field_categories: string[]
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'godown_warehouse_id'
  })
  godown_warehouse_id: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'item_type'
  })
  item_type: string

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    name: 'item_name'
  })
  item_name: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'item_category'
  })
  item_category: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'item_code'
  })
  item_code: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'item_description'
  })
  item_description: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'mrp_enabled'
  })
  is_mrp_enabled: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'wholesale_enabled'
  })
  is_wholesale_enabled: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_synced'
  })
  is_synced: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'serialization_enabled'
  })
  is_serialization_enabled: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'batching_enabled'
  })
  is_batching_enabled: boolean

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
    length: 16,
    default: 'without_tax',
    name: 'selling_price_type'
  })
  selling_price_type: string

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    nullable: true,
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
    length: 16,
    default: 'without_tax',
    name: 'purchase_price_type'
  })
  purchase_price_type: string

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    nullable: true,
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
    length: 16,
    default: 'without_tax',
    name: 'wholesale_price_type'
  })
  wholesale_price_type: string

  @Column({
    type: 'int8',
    default: 0,
    name: 'wholesale_quantity'
  })
  wholesale_quantity: number

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
    name: 'discount_type'
  })
  discount_type: string

  @Column({
    type: 'int8',
    default: 0,
    nullable: true,
    name: 'discount_percent'
  })
  discount_percent: number

  @Column({
    type: 'int8',
    default: 0,
    nullable: true,
    name: 'discount_amount'
  })
  discount_amount: number

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'hsn_code'
  })
  hsn_code: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'sac_code'
  })
  sac_code: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'tax'
  })
  tax: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'cess'
  })
  cess: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'unit'
  })
  unit: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_secondary_unit_enabled'
  })
  is_secondary_unit_enabled: boolean

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    name: 'secondary_unit'
  })
  secondary_unit: string

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
    name: 'conversion_rate'
  })
  conversion_rate: number

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    nullable: true,
    transformer: {
      to(value) {
        return value
      },
      from(value) {
        return parseFloat(value)
      }
    },
    name: 'opening_stock'
  })
  opening_stock: number

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'opening_stock_date'
  })
  opening_stock_date: Date

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
    name: 'closing_stock'
  })
  closing_stock: number

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_min_stock_alert_enabled'
  })
  is_min_stock_alert_enabled: boolean

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
    name: 'min_stock_count'
  })
  min_stock_count: number

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'image'
  })
  image: Buffer;

  // @JoinColumn()
  // @OneToOne(() => FileStorage, {
  //   eager: true,
  //   nullable: true
  // })
  // item_image_url: FileStorage

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(value: ICustomField[]): string {
        return JSON.stringify(value)
      },
      from(value: string): ICustomField[] {
        return JSON.parse(value)
      }
    }
  })
  custom_fields: ICustomField[]

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'serial_no_label'
  })
  serial_no_label: string

  @OneToMany(() => ItemSerialisation, (item_serialisation) => item_serialisation.item, {
    cascade: true
  })
  item_serialisation: ItemSerialisation[]

  @OneToMany(() => ItemBatching, (item_batching) => item_batching.item, {
    cascade: true
  })
  item_batching: ItemBatching[]

  @Column({
    type:'boolean',
    default:false,
    name:'is_online_store_enabled'
  })
  is_online_store_enabled:boolean

  @Column({
    type:'boolean',
    default:false,
    name:'is_ondc_store_enabled'
  })
  is_ondc_store_enabled:boolean

  @Column({
    type:'boolean',
    default:false,
    name:'is_enabled'
  })
  is_enabled:boolean

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
