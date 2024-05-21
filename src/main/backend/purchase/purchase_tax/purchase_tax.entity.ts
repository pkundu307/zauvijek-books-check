import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm'
import { Purchase } from '../purchase/purchase.entity'

  @Entity()
  export class Purchase_tax {
    @PrimaryGeneratedColumn('uuid')
    purchase_tax_id: string
  
    @Column({
      type: 'decimal',
      nullable: false,
      name: 'tax_rate'
    })
    tax_rate: number
  
    @Column({
      type: 'decimal',
      nullable: true,
      name: 'taxable_amount'
    })
    taxable_amount: number
  
    @Column({
      type: 'decimal',
      nullable: true,
      name: 'cgst'
    })
    cgst: string
  
    @Column({
      type: 'decimal',
      nullable: true,
      name: 'sgst'
    })
    sgst: number

    @Column({
        type: 'decimal',
        nullable: true,
        name: 'igst'
      })
      igst: number

      @Column({
        type: 'decimal',
        nullable: true,
        name: 'cess'
      })
      cess: number

      @Column({
        type: 'decimal',
        nullable: true,
        name: 'total'
      })
      total: number

      @ManyToOne(() => Purchase, (purchase) => purchase.purchase_tax, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      @JoinColumn({ name: 'purchase_id' })
      purchase: Purchase

      @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
      })
      created_at: Date
    
      @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
      })
      updated_at: Date
}