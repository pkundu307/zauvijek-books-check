import Database from '../config/db'
import { CreditUsage } from './credit_usage.entity'

export default class CreditUsageService extends Database {
  constructor() {
    super()
    this.init()
    this.createCreditUsage = this.createCreditUsage.bind(this)
    this.getCreditUsages = this.getCreditUsages.bind(this)
    this.getCreditUsageById = this.getCreditUsageById.bind(this)
    this.updateCreditUsage = this.updateCreditUsage.bind(this)
    this.deleteCreditUsage = this.deleteCreditUsage.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createCreditUsage(params: any): Promise<CreditUsage []> {
    const creditUsageRepository = this.dataSource.getRepository(CreditUsage)
    const newCreditUsage = creditUsageRepository.create(params)
    await creditUsageRepository.save(newCreditUsage)
    return newCreditUsage
  }

  public async getCreditUsages(params: {
    business_id: string
    start_date: Date
    end_date: Date
    credit_type: string
  }): Promise<CreditUsage[]> {
    const { business_id, start_date, end_date, credit_type } = params

    const creditUsagesRepository = this.dataSource.getRepository(CreditUsage)
    const queryBuilder = creditUsagesRepository.createQueryBuilder('credit_usage')

    await queryBuilder
      .where('credit_usage.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('credit_usage.credit_type = :credit_type', {
        credit_type: credit_type
      })
      .andWhere('credit_usage.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('credit_usage.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('credit_usage.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAll(): Promise<CreditUsage[]> {
    const creditUsagesRepository = this.dataSource.getRepository(CreditUsage)
    const queryBuilder = creditUsagesRepository.createQueryBuilder('credit_usage')
    await queryBuilder.orderBy('credit_usage.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCreditUsageById(id: string): Promise<CreditUsage | unknown> {
    const creditUsageRepository = this.dataSource.getRepository(CreditUsage)
    return await creditUsageRepository.find({ where: { id: id } })
  }

  public async updateCreditUsage(id: string, updates: Partial<CreditUsage>): Promise<void> {
    const CreditUsageRepository = this.dataSource.getRepository(CreditUsage)

    try {
      // Find CreditUsage with the provided id
      const creditUsageToUpdate = await CreditUsageRepository.findOne({ where: { id: id } })
      // Update the CreditUsage with the provided updates
      Object.assign(creditUsageToUpdate || {}, updates)
      console.log(creditUsageToUpdate)

      // Save the updated CreditUsage
      await CreditUsageRepository.save(creditUsageToUpdate || {})

      console.log(`Credit Usage updated successfully:`, creditUsageToUpdate)
    } catch (error) {
      console.error('Error updating CreditUsage:', error)
      throw error
    }
  }

  public async deleteCreditUsage(id): Promise<unknown> {
    const creditUsageRepository = this.dataSource.getRepository(CreditUsage)
    return await creditUsageRepository.delete(id)
  }
}
