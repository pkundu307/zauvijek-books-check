import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { Marketing } from '../marketing/marketing.entity'

@Entity()
export class MarketingList {
  @PrimaryGeneratedColumn('uuid')
  marketing_list_id: string

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'party_id'
  })
  party_id: string

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'party_name'
  })
  party_name: string

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    name: 'phone_no'
  })
  phone_no: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'email'
  })
  email: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'status'
  })
  status: string

  @ManyToOne(() => Marketing, (marketing) => marketing.marketing_list, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'marketing_id' })
  marketing: Marketing

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
