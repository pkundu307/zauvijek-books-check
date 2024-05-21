import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id'
  })
  user_id: string

  @Column({
    type: 'varchar',
    length: 256,
    default: 'Admin',
    name: 'role'
  })
  role: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'permissions'
  })
  permissions: string

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_enabled'
  })
  is_enabled: string

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
