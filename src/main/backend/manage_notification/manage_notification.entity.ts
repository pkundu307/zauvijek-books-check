import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ManageNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'business_id'
  })
  business_id: string;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_email_enabled',
    default: false
  })
  is_email_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_whatsapp_enabled',
    default: false
  })
  is_whatsapp_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_sms_enabled',
    default: false
  })
  is_sms_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_billing_alert_enabled',
    default: false
  })
  is_billing_alert_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_payment_alert_enabled',
    default: false
  })
  is_payment_alert_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_due_date_alert_enabled',
    default: false
  })
  is_due_date_alert_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_min_stock_alert_enabled',
    default: false
  })
  is_min_stock_alert_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_daily_sale_summary_enabled',
    default: false
  })
  is_daily_sale_summary_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_einvoice_alert_enabled',
    default: false
  })
  is_einvoice_alert_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_ewaybill_alert_enabled',
    default: false
  })
  is_ewaybill_alert_enabled: boolean;

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

