import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CustomField {
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
    name: 'field_type'
  })
  field_type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'field_label'
  })
  field_label: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'field_value'
  })
  field_value: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'field_categories'
  })
  field_categories: string;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'is_invoice_enabled',
    default: false
  })
  is_invoice_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
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
