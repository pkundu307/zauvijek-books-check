import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BillingItem } from './billing_item.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'account_id'
  })
  account_id: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'transaction_id'
  })
  transaction_id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'invoice_prefix'
  })
  invoice_prefix: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'invoice_no'
  })
  invoice_no: number;

  @OneToMany(() => BillingItem, (billing_item) => billing_item.billing, {
    cascade: true
  })
  billing_item: BillingItem[]

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'promocode'
  })
  promocode: string;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'total_taxable_amount'
  })
  total_taxable_amount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'total_tax_amount'
  })
  total_tax_amount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'total_amount'
  })
  total_amount: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    name: 'status'
  })
  status: string;

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
