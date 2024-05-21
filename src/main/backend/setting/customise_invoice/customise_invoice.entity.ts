import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class CustomiseInvoice {
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
    length: 128,
    nullable: true,
    name: 'invoice_type'
  })
  invoice_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'theme_name'
  })
  theme_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'theme_color'
  })
  theme_color: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'page_size'
  })
  page_size: string

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
    name: 'business_address'
  })
  business_address: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'business_email'
  })
  business_email: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'business_phone_no'
  })
  business_phone_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax_id'
  })
  tax_id: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business_name_enabled'
  })
  is_business_name_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business_address_enabled'
  })
  is_business_address_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business_email_enabled'
  })
  is_business_email_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business_phone_no_enabled'
  })
  is_business_phone_no_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_business_tax_id_enabled'
  })
  is_business_tax_id_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_sale_taxes_enabled'
  })
  is_sale_taxes_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_payment_amount_enabled'
  })
  is_payment_amount_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_balance_amount_enabled'
  })
  is_balance_amount_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_party_closing_amount_enabled'
  })
  is_party_closing_amount_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_payment_mode_enabled'
  })
  is_payment_mode_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_bank_detail_enabled'
  })
  is_bank_detail_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_qr_code_enabled'
  })
  is_qr_code_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_signature_enabled'
  })
  is_signature_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_term_condition_enabled'
  })
  is_term_condition_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_notes_enabled'
  })
  is_notes_enabled: string

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
