import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum PartyType {
  CUSTOMER = 'customer',
  SUPPLIER = 'supplier'
}

export enum PartyForm {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business'
}
@Entity()
export class Party {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: string

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    name: 'business_name'
  })
  business_name: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'party_type'
  })
  party_type: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'party_category'
  })
  party_category: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'party_name'
  })
  party_name: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business'
  })
  is_business: boolean

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
    name: 'email'
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'phone_no',
    length: 36
  })
  phone_no: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'phone_no_alt',
    length: 36
  })
  phone_no_alt: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable:true,
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
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tan_no'
  })
  tan_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'place_of_supply'
  })
  place_of_supply: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'billing_address'
  })
  billing_address: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'shipping_address'
  })
  shipping_address: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_billing_shipping_same'
  })
  is_billing_shipping_same: boolean

  @Column({ type: 'decimal', name: 'opening_balance', nullable: true })
  opening_balance: number

  @Column({ type: 'varchar', length: 36, name: 'opening_balance_type', nullable: true })
  opening_balance_type: string

  @Column({ type: 'datetime', name: 'opening_balance_date', nullable: true })
  opening_balance_date: Date

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'credit_period'
  })
  credit_period: number

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
    name: 'credit_limit'
  })
  credit_limit: number

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
    name: 'closing_balance'
  })
  closing_balance: number

  @Column({
    type: 'text',
    name: 'notes',
    nullable: true
  })
  notes: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_enabled'
  })
  is_enabled: boolean

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
