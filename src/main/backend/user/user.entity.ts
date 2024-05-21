import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'uuid',
    nullable: true
  })
  business_id: string

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'name'
  })
  name: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'email'
  })
  email: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'password'
  })
  password: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no'
  })
  phone_no: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_email_verified'
  })
  is_email_verified: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_phone_no_verified'
  })
  is_phone_no_verified: boolean

  @Column({
    type: 'int',
    default: false,
    name: 'email_otp'
  })
  email_otp: number

  @Column({
    type: 'int',
    default: false,
    name: 'phone_otp'
  })
  phone_otp: number

  @Column({
    type: 'varchar',
    length: 256,
    default: 'Admin',
    name: 'role'
  })
  role: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'referral_code'
  })
  referral_code: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'avatar'
  })
  avatar: string

  @Column({
    type: 'int',
    nullable: true,
    name: 'passcode'
  })
  passcode: number

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_passcode_enabled'
  })
  is_passcode_enabled: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_enabled'
  })
  is_enabled: boolean

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'ip_address'
  })
  ip_address: string

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  last_signin_at: Date

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
