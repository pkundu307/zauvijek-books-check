import Database from '../../config/db'
import { Sale } from './sale.entity'
import { PDF, thermalPdf } from '../../pdf/pdf.controller'

export default class SaleService extends Database {
  constructor() {
    super()
    this.init()
    this.createSale = this.createSale.bind(this)
    this.getSales = this.getSales.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getSaleById = this.getSaleById.bind(this)
    this.updateSale = this.updateSale.bind(this)
    this.deleteSale = this.deleteSale.bind(this)
    this.getSalesPDF = this.getSalesPDF.bind(this)
    this.getSalesThermalPDF = this.getSalesThermalPDF.bind(this)
  }

  async createSale(params: any): Promise<Sale[]> {
    const saleRepository = this.dataSource.getRepository(Sale)
    const newSale = saleRepository.create(params)
    await saleRepository.save(newSale)
    return newSale
  }

  public async getSalesPDF(params: {
    business_id: any
    sale_type: any
    id: any
  }): Promise<any> {
    const { business_id, sale_type, id } = params
    console.log(params,'backend');
    
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')
    await queryBuilder
    .where('sale.business_id = :business_id', {
      business_id: business_id
    })
    .where('sale.id = :id', {
      id: id
    })
    .andWhere('sale.sale_type = :sale_type', {
      sale_type: sale_type
    })
    .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
    .leftJoinAndSelect('sale.sale_item', 'sale_item')
    .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
    .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
    .getRawOne()
    const { entities } = await queryBuilder.getRawAndEntities()

    console.log(entities[0]);

    return PDF.generatePDF(entities[0])
    
  }

  public async getSalesThermalPDF(params: {
    business_id: any
    sale_type: any
    id: any
  }): Promise<any> {
    const { business_id, sale_type, id } = params
    console.log(params,'backend');
    
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')
    await queryBuilder
    .where('sale.business_id = :business_id', {
      business_id: business_id
    })
    .where('sale.id = :id', {
      id: id
    })
    .andWhere('sale.sale_type = :sale_type', {
      sale_type: sale_type
    })
    .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
    .leftJoinAndSelect('sale.sale_item', 'sale_item')
    .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
    .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
    .getRawOne()
    const { entities } = await queryBuilder.getRawAndEntities()

    console.log(entities[0]);

    return thermalPdf.generatePDF(entities[0])
    
  }

  public async getSales(params: {
    business_id: string
    start_date: Date
    end_date: Date
    sale_type: string
  }): Promise<Sale[]> {
    const { business_id, start_date, end_date, sale_type } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)

    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')

    await queryBuilder
      .where('sale.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('sale.sale_type = :sale_type', {
        sale_type: sale_type
      })
      .andWhere('sale.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('sale.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('sale.created_at', 'DESC')
      .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
      .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAll(): Promise<Sale[]> {
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')
    await queryBuilder
      .orderBy('sale.created_at', 'DESC')
      .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
      .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getSaleById(id: string): Promise<Sale | unknown> {
    const saleRepository = this.dataSource.getRepository(Sale)

    const queryBuilder = saleRepository.createQueryBuilder('sale')
    const sale = await queryBuilder
      .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
      .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
      .where('sale.id = :id', { id })
      .getOne()

    return sale
  }

  public async updateSale(id: string, updates: Partial<Sale>): Promise<void> {
    const saleRepository = this.dataSource.getRepository(Sale)

    try {
      // Find Sale with the provided id
      const saleToUpdate = await saleRepository.findOne({ where: { id: id } })
      // Update the Sale with the provided updates
      Object.assign(saleToUpdate || {}, updates)
      console.log(saleToUpdate)

      // Save the updated Sale
      await saleRepository.save(saleToUpdate || {})

      console.log(`Sale updated successfully:`, saleToUpdate)
    } catch (error) {
      console.error('Error updating Sale:', error)
      throw error
    }
  }

  public async deleteSale(id): Promise<unknown> {
    const saleRepository = this.dataSource.getRepository(Sale)
    return await saleRepository.delete(id)
  }
}
