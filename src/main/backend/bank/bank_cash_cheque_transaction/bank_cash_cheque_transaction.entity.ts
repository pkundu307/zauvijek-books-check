import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { BankCashCheque } from '../bank_cash_cheque/bank_cash_cheque.entity';

@Entity()
export class BankCashChequeTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'business_id'
  })
  business_id: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'party_id'
  })
  party_id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'party_name'
  })
  party_name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'transaction_type'
  })
  transaction_type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'transaction_no'
  })
  transaction_no: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'payment_mode'
  })
  payment_mode: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'paid_amount'
  })
  paid_amount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'received_amount'
  })
  received_amount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'balance_amount'
  })
  balance_amount: number;

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
  @ManyToOne(() => BankCashCheque, (BankCashCheque) => BankCashCheque.bank_cash_cheque_transaction)
  bank_cash_cheque: BankCashCheque[]
}
