import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: string

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
    name: 'currency_name'
  })
  currency_code: string

  @Column({
    type: 'varchar',
    length: 2,
    nullable: true,
    name: 'currency_code'
  })
  currency_symbol: string

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
    name: 'conversion_amount'
  })
  conversion_amount: number

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_enabled'
  })
  is_enabled: string

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
