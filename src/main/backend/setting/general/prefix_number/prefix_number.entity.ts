import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class PrefixNumber {
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
    length: 128,
    nullable: true,
    name: 'feature_type'
  })
  feature_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'prefix_name'
  })
  prefix_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'start_number'
  })
  start_number: string

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
