import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { MarketingList } from '../marketing_list/marketing_list.entity'

@Entity()
export class Marketing {
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
    name: 'campaign_name'
  })
  campaign_name: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'campaign_type'
  })
  campaign_type: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'message_text'
  })
  message_text: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'message_image'
  })
  message_image: string

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  schedule_date: Date

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    name: 'status'
  })
  status: string

  @OneToMany(() => MarketingList, (marketing_list) => marketing_list.marketing, {
    cascade: true
  })
  marketing_list: MarketingList[]

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
