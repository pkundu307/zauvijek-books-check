import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ReferEarn {
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
    name: 'referral_code'
  })
  referral_code: string;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'total_amount'
  })
  total_amount: number;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'is_paid',
    default: false // Assuming default is true until payment is made
  })
  is_paid: boolean;

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

