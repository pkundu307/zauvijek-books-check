import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class UserApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'business_id'
  })
  business_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'admin_id'
  })
  admin_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id'
  })
  user_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'feature_id'
  })
  feature_id: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'feature_name'
  })
  feature_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'approval_type'
  })
  approval_type: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'status'
  })
  status: string

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
