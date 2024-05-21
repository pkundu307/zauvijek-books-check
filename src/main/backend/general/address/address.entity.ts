import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Address {
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
  name: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    name: 'street'
  })
  street: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'city'
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'state'
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'country'
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'pincode'
  })
  pincode: string;

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
