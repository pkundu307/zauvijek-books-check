import Database from '../config/db'
import { Billing } from './entities/billing.entity'

export default class BillingService extends Database {
  constructor() {
    super()
    this.init()
    this.createBilling = this.createBilling.bind(this)
    this.getBillings = this.getBillings.bind(this)
    this.getBillingById = this.getBillingById.bind(this)
    this.updateBilling = this.updateBilling.bind(this)
    this.deleteBilling = this.deleteBilling.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createBilling(params: any): Promise<Billing []> {
    const billingRepository = this.dataSource.getRepository(Billing)
    const newBilling = billingRepository.create(params)
    await billingRepository.save(newBilling)
    return newBilling
  }

  public async getAll(): Promise<Billing[]> {
    const billingRepository = this.dataSource.getRepository(Billing)
    const queryBuilder = billingRepository.createQueryBuilder('billing')

    await queryBuilder
    .leftJoinAndSelect('billing.billing_item','billing_item')
    .orderBy('billing.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBillings(params: {
    business_id: string    
     start_date: Date
    end_date: Date
  }): Promise<Billing[]> {
    const { business_id, start_date, end_date } = params

    const billingRepository = this.dataSource.getRepository(Billing)
    const queryBuilder = billingRepository.createQueryBuilder('billing')

    await queryBuilder
      .where('billing.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('billing.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('billing.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('billing.billing_item','billing_item')
      .orderBy('billing.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBillingById(id: string): Promise<Billing | unknown> {
    const billingRepository = this.dataSource.getRepository(Billing)
    return await billingRepository.find({ where: { id: id } })
  }

  public async updateBilling(id: string, updates: Partial<Billing>): Promise<void> {
    const billingRepository = this.dataSource.getRepository(Billing)

    try {
      // Find Billing with the provided id
      const billingToUpdate = await billingRepository.findOne({ where: { id: id } })
      // Update the Billing with the provided updates
      Object.assign(billingToUpdate ||{}, updates)

      // Save the updated Billing
      await billingRepository.save(billingToUpdate ||{})

    } catch (error) {
      console.error('Error updating Billing:', error)
      throw error
    }
  }

  public async deleteBilling(id): Promise<unknown> {
    const billingRepository = this.dataSource.getRepository(Billing)
    return await billingRepository.delete(id)
  }
}
