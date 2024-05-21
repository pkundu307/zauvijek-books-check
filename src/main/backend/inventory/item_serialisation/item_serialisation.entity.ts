import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Item } from '../item/item.entity'

@Entity()
export class ItemSerialisation {
  @PrimaryGeneratedColumn('uuid')
  item_serialisation_id: string

  @Column({ type: 'varchar',nullable:true })
  serial_no: string

  @Column({ type: 'datetime', nullable: true })
  serial_no_date: Date

  @Column({ type: 'boolean',nullable: true, name:'is_available' })
  is_available: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Item, (item) => item.item_serialisation)
  item: Item[]
}
