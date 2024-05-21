import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { SaleItem } from '../sale_item/sale_item.entity'
import { SaleAdditionalCharge } from '../sale_additional_charge/sale_additional_charge.entity'
import { SalePaymentMode } from '../sale_payment_mode/sale_payment_mode.entity'
import { Sale_tax } from '../sale_tax/sale_tax.entity'

@Entity()
export class Sale {
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
    name: 'party_id'
  })
  party_id: string

  @Column({
    type:'boolean',
    default:false
  })
  is_scan_item_enabled:boolean

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'sale_type'
  })
  sale_type: string = ''

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'invoice_prefix'
  })
  invoice_prefix: string

  @Column({
    type: 'int',
    default: 0,
    name: 'invoice_no'
  })
  invoice_no: number

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'invoice_date'
  })
  invoice_date: Date

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_due_date_enabled'
  })
  is_due_date_enabled: boolean

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'due_date'
  })
  due_date: Date

  @Column({
    type: 'int',
    default: 0,
    name: 'payment_term'
  })
  payment_term: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'party_type'
  })
  party_type: string

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
    name: 'business_name'
  })
  business_name: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'billing_address'
  })
  billing_address: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'shipping_address'
  })
  shipping_address: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'place_of_supply'
  })
  place_of_supply: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no'
  })
  phone_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax_id'
  })
  tax_id: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'pan_no'
  })
  pan_no: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_discount_after_tax_enabled'
  })
  is_discount_after_tax_enabled: string

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
    name: 'total_tax_amount'
  })
  total_tax_amount: number

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_auto_roundoff_enabled'
  })
  is_auto_roundoff_enabled: boolean

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'roundoff_type'
  })
  roundoff_type: string

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
    name: 'roundoff_amount'
  })
  roundoff_amount: number

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
    name: 'balance_amount'
  })
  balance_amount: number

  @Column({
    type: 'text',
    nullable: true,
    name: 'term_condition'
  })
  term_condition: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'notes'
  })
  notes: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_settled'
  })
  is_settled: boolean

  @OneToMany(() => SaleItem, (sale_item) => sale_item.sale, {
    cascade: true
  })
  sale_item: SaleItem[]

  @OneToMany(() => Sale_tax, (sale_tax) => sale_tax.sale, {
    cascade: true
  })
  sale_tax: Sale_tax[]
  

  @OneToMany(() => SaleAdditionalCharge, (sale_additional_charge) => sale_additional_charge.sale, {
    cascade: true
  })
  sale_additional_charge: SaleAdditionalCharge[]

  @OneToMany(() => SalePaymentMode, (sale_payment_mode) => sale_payment_mode.sale, {
    cascade: true
  })
  sale_payment_mode: SalePaymentMode[]

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
