import Database from '../../config/db'
import { PDF, thermalPdf } from '../../pdf/pdf.controller'
import { Purchase } from './purchase.entity'

export default class PurchaseService extends Database {
  constructor() {
    super()
    this.init()
    this.createPurchase = this.createPurchase.bind(this)
    this.getPurchases = this.getPurchases.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getPurchaseById = this.getPurchaseById.bind(this)
    this.updatePurchase = this.updatePurchase.bind(this)
    this.deletePurchase = this.deletePurchase.bind(this)
  }

  async createPurchase(params: any): Promise<Purchase[]> {
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const newPurchase = purchaseRepository.create(params)
    await purchaseRepository.save(newPurchase)
    return newPurchase
  }

  public async getPurchases(params: {
    business_id: string
    start_date: Date
    end_date: Date
    purchase_type: string
  }): Promise<Purchase[]> {
    const { business_id, start_date, end_date, purchase_type } = params
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')

    await queryBuilder
      .where('purchase.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('purchase.purchase_type = :purchase_type', {
        purchase_type: purchase_type
      })
      .andWhere('purchase.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('purchase.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('purchase.created_at', 'DESC')
      .leftJoinAndSelect('purchase.purchase_additional_charge', 'purchase_additional_charge')
      .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
      .leftJoinAndSelect('purchase.purchase_payment_mode', 'purchase_payment_mode')
      .leftJoinAndSelect('purchase.purchase_tax', 'purchase_tax')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getPurchaseById(id: string): Promise<Purchase | unknown> {
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')
    const purchase = await queryBuilder
      .leftJoinAndSelect('purchase.purchase_additional_charge', 'purchase_additional_charge')
      .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
      .leftJoinAndSelect('purchase.purchase_payment_mode', 'purchase_payment_mode')
      .leftJoinAndSelect('purchase.purchase_tax', 'purchase_tax')
      .where('purchase.id = :id', { id })
      .getOne()

    return purchase
  }
  public async updatePurchase(id: string, updates: Partial<Purchase>): Promise<void> {
    const purchaseRepository = this.dataSource.getRepository(Purchase)

    try {
      // Find purchase with the provided id
      const PurchaseToUpdate = await purchaseRepository.findOne({ where: { id: id } })
      // Update the purchase with the provided updates
      Object.assign(PurchaseToUpdate || {}, updates)

      // Save the updated purchase
      await purchaseRepository.save(PurchaseToUpdate || {})
    } catch (error) {
      console.error('Error updating purchase:', error)
      throw error
    }
  }
  public async deletePurchase(id): Promise<unknown> {
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    return await purchaseRepository.delete(id)
  }

  public async getPurchasePDF(params: {
    business_id: any
    purchase_type: any
    id: any
  }): Promise<any> {
    const { business_id, purchase_type, id } = params
    console.log(params,'backend');
    
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')
    await queryBuilder
    .where('purchase.business_id = :business_id', {
      business_id: business_id
    })
    .where('purchase.id = :id', {
      id: id
    })
    .andWhere('purchase.purchase_type = :purchase_type', {
      purchase_type: purchase_type
    })
    .leftJoinAndSelect('purchase.purchase_additional_charge', 'purchase_additional_charge')
    .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
    .leftJoinAndSelect('purchase.purchase_payment_mode', 'purchase_payment_mode')
    .leftJoinAndSelect('purchase.purchase_tax', 'purchase_tax')
    .getRawOne()
    const { entities } = await queryBuilder.getRawAndEntities()

    console.log(entities[0]);

    return PDF.generatePDF(entities[0])
    
  }

  public async getPurchaseThermalPDF(params: {
    business_id: any
    purchase_type: any
    id: any
  }): Promise<any> {
    const { business_id, purchase_type, id } = params
    console.log(params,'backend');
    
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')
    await queryBuilder
    .where('purchase.business_id = :business_id', {
      business_id: business_id
    })
    .where('purchase.id = :id', {
      id: id
    })
    .andWhere('purchase.purchase_type = :purchase_type', {
      purchase_type: purchase_type
    })
    .leftJoinAndSelect('purchase.purchase_additional_charge', 'purchase_additional_charge')
    .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
    .leftJoinAndSelect('purchase.purchase_payment_mode', 'purchase_payment_mode')
    .leftJoinAndSelect('purchase.purchase_tax', 'purchase_tax')
    .getRawOne()
    const { entities } = await queryBuilder.getRawAndEntities()

    console.log(entities[0]);

    return thermalPdf.generatePDF(entities[0])
    
  }

  public async getAll(): Promise<Purchase[]> {
    const purchasesRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchasesRepository.createQueryBuilder('purchase')
    await queryBuilder.orderBy('purchase.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
}
