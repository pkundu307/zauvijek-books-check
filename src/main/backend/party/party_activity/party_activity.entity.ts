import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class PartyActivity {
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
    nullable: true,
    name: 'party_type'
  })
  party_type: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'party_category'
  })
  party_category: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'party_name'
  })
  party_name: string

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'total_amount'
  })
  total_amount: number

  @Column({
    type: 'decimal',
    nullable: true,
    name: 'closing_balance'
  })
  closing_balance: number

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
