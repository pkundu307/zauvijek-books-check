import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm'
import { Sale } from '../sale/sale.entity'

  @Entity()
  export class Sale_tax {
    @PrimaryGeneratedColumn('uuid')
    sale_tax_id: string
  
    @Column({
      type: 'decimal',
      nullable: true,
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
      @Column({
        type: 'varchar',
        nullable: true,
        length:128,
        name: 'hsn_code'
      })
      hsn_code: string
      @Column({
        type: 'varchar',
        nullable: true,
        length:128,
        name: 'sac_code'
      })
      sac_code: string


      @ManyToOne(() => Sale, (sale) => sale.sale_tax, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      @JoinColumn({ name: 'sale_id' })
      sale: Sale

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