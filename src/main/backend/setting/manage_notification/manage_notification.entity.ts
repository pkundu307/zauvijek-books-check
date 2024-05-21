import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ManageNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: ' business_id'
  })
  business_id: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_email_enabled'
  })
  is_email_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_whatsapp_enabled'
  })
  is_whatsapp_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_sms_enabled'
  })
  is_sms_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_billing_alert_enabled'
  })
  is_billing_alert_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_payment_alert_enabled'
  })
  is_payment_alert_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_due_date_alert_enabled'
  })
  is_due_date_alert_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_min_stock_alert_enabled'
  })
  is_min_stock_alert_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_daily_sale_summary_enabled'
  })
  is_daily_sale_summary_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_einvoice_alert_enabled'
  })
  is_einvoice_alert_enabled: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_ewaybill_alert_enabled'
  })
  is_ewaybill_alert_enabled: string

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
