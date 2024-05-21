import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class GodownWarehouse {
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
    length: 512,
    nullable: true,
    name: 'name'
  })
  name: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'address'
  })
  address: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'place_of_supply'
  })
  place_of_supply: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_default'
  })
  is_default: boolean

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_enabled'
  })
  is_enabled: boolean

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
