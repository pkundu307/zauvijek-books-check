import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CreditUsage {
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
    name: 'credit_type'
  })
  credit_type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'feature_name'
  })
  feature_name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no'
  })
  phone_no: string;

  @Column({
    type: 'text',
    nullable: true
  })
  message: string;

  @Column({
    type: 'decimal',
    nullable: true
  })
  credit: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'credit_used'
  })
  credit_used: number;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'credit_balance'
  })
  credit_balance: number;

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
