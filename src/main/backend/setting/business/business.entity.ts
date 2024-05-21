import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id'
  })
  user_id: string

  @Column({
    type: 'uuid',
    nullable: true,
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
    length: 128,
    nullable: true,
    name: 'business_type'
  })
  business_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'incorporation_type'
  })
  incorporation_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'industry_type'
  })
  industry_type: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'email'
  })
  email: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no'
  })
  phone_no: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no_alt'
  })
  phone_no_alt: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'website'
  })
  website: string

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
    name: 'registration_no'
  })
  registration_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'place_of_supply'
  })
  place_of_supply: string

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
    type: 'boolean',
    default: false,
    name: 'is_billing_shipping_same'
  })
  is_billing_shipping_same: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'business_logo'
  })
  business_logo: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'signature'
  })
  signature: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'notes'
  })
  notes: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_enabled'
  })
  is_enabled: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date
}
