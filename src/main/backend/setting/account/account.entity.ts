import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id'
  })
  user_id: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  plan_start_date: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  plan_end_date: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'platform'
  })
  platform: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'licence_code'
  })
  licence_code: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'device_code'
  })
  device_code: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'channel_partner_code'
  })
  channel_partner_code: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'distributer_code'
  })
  distributer_code: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'employee_code'
  })
  employee_code: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'business_credit'
  })
  business_credit: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'business_credit_used'
  })
  business_credit_used: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'user_credit'
  })
  user_credit: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'user_credit_used'
  })
  user_credit_used: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'email_credit'
  })
  email_credit: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'email_credit_used'
  })
  email_credit_used: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'sms_credit'
  })
  sms_credit: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'sms_credit_used'
  })
  sms_credit_used: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'whatsapp_credit'
  })
  whatsapp_credit: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'whatsapp_credit_used'
  })
  whatsapp_credit_used: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_enabled'
  })
  is_enabled: boolean

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

// id
// user_id
// plan_name
// plan_start_date
// plan_end_date
// platform
// licence_code
// device_code
// channel_partner_code
// distributer_code
// employee_code
// business_credit
// business_credit_used
// user_credit
// user_credit_used
// email_credit
// email_credit_used
// sms_credit
// sms_credit_used
// whatsapp_credit
// whatsapp_credit_used
// is_enabled
// created_at
// updated_at
