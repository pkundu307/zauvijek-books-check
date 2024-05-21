import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Billing } from './billing.entity';

@Entity()
export class BillingItem {
  @PrimaryGeneratedColumn('uuid')
  billing_item_id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'plan_name'
  })
  plan_name: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'duration'
  })
  duration: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'credit'
  })
  credit: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'price'
  })
  price: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'quantity'
  })
  quantity: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'discount_percent'
  })
  discount_percent: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'discount_amount'
  })
  discount_amount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'taxable_amount'
  })
  taxable_amount: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'tax'
  })
  tax: string;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'tax_amount'
  })
  tax_amount: number;

@ManyToOne(() => Billing, (billing) => billing.billing_item, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'business_id' })
  billing: Billing

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'amount'
  })
  amount: number;

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updated_at: Date;
}

