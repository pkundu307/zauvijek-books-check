import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PrefixNumber {
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
    name: 'feature_type'
  })
  feature_type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'prefix_name'
  })
  prefix_name: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'start_number'
  })
  start_number: number;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'is_enabled',
    default: true
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

