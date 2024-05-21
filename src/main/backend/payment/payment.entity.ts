import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Payment {
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
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'party_type'
  })
  party_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_type'
  })
  payment_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_category'
  })
  payment_category: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'party_name'
  })
  party_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_prefix'
  })
  payment_prefix: string

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    name: 'payment_no'
  })
  payment_no: number

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_mode'
  })
  payment_mode: string

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
    name: 'payment_amount'
  })
  payment_amount: number

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'payment_date'
  })
  payment_date: Date

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'bank_cash_cheque_id'
  })
  bank_cash_cheque_id: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'account_name'
  })
  account_name: string

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
    nullable: true,
    name: 'invoice_no'
  })
  invoice_no: number

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
    name: 'notes'
  })
  notes: string

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
