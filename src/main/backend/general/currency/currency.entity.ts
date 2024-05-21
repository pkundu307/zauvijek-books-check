import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Currency {
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
    length: 8,
    nullable: true,
    name: 'currency_code'
  })
  currency_code: string;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: true,
    name: 'currency_symbol'
  })
  currency_symbol: string;

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'conversion_amount'
  })
  conversion_amount: number;

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
