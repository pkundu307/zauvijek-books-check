import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CustomiseInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'business_id'
  })
  business_id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'invoice_type'
  })
  invoice_type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'theme_name'
  })
  theme_name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'theme_color'
  })
  theme_color: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'page_size'
  })
  page_size: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'business_name'
  })
  business_name: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'business_address'
  })
  business_address: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'business_email'
  })
  business_email: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'business_phone_no'
  })
  business_phone_no: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'business_tax_id'
  })
  business_tax_id: string;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_business_name_enabled',
    default: false
  })
  is_business_name_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_business_address_enabled',
    default: false
  })
  is_business_address_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_business_email_enabled',
    default: false
  })
  is_business_email_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_business_phone_no_enabled',
    default: false
  })
  is_business_phone_no_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_business_tax_id_enabled',
    default: false
  })
  is_business_tax_id_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_sale_taxes_enabled',
    default: false
  })
  is_sale_taxes_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_payment_amount_enabled',
    default: false
  })
  is_payment_amount_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_balance_amount_enabled',
    default: false
  })
  is_balance_amount_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_party_closing_amount_enabled',
    default: false
  })
  is_party_closing_amount_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_payment_mode_enabled',
    default: false
  })
  is_payment_mode_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_bank_detail_enabled',
    default: false
  })
  is_bank_detail_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_qr_code_enabled',
    default: false
  })
  is_qr_code_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_signature_enabled',
    default: false
  })
  is_signature_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_term_condition_enabled',
    default: false
  })
  is_term_condition_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_notes_enabled',
    default: false
  })
  is_notes_enabled: boolean;

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
