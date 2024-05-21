import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id'
  })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'plan_name'
  })
  plan_name: string;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'plan_start_date'
  })
  plan_start_date: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'plan_end_date'
  })
  plan_end_date: Date;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'platform'
  })
  platform: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'licence_code'
  })
  licence_code: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'device_code'
  })
  device_code: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'channel_partner_code'
  })
  channel_partner_code: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'distributer_code'
  })
  distributer_code: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'employee_code'
  })
  employee_code: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'business_credit'
  })
  business_credit: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'business_credit_used'
  })
  business_credit_used: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'user_credit'
  })
  user_credit: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'user_credit_used'
  })
  user_credit_used: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'email_credit'
  })
  email_credit: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'email_credit_used'
  })
  email_credit_used: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'sms_credit'
  })
  sms_credit: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'sms_credit_used'
  })
  sms_credit_used: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'whatsapp_credit'
  })
  whatsapp_credit: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'whatsapp_credit_used'
  })
  whatsapp_credit_used: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
    name: 'is_enabled'
  })
  is_enabled: boolean;

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

