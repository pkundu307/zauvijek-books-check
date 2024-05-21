import Database from '../config/db'
import { Business } from './business.entity'

export default class BusinessService extends Database {
  constructor() {
    super()
    this.init()
    this.createBusiness = this.createBusiness.bind(this)
    this.getBusinesss = this.getBusinesss.bind(this)
    this.getBusinessById = this.getBusinessById.bind(this)
    this.updateBusiness = this.updateBusiness.bind(this)
    this.deleteBusiness = this.deleteBusiness.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createBusiness(params: any): Promise<Business[]> {
    const businessRepository = this.dataSource.getRepository(Business)
    const newBusiness = businessRepository.create(params)
    await businessRepository.save(newBusiness)
    return newBusiness
  }

  public async getAll(): Promise<Business[]> {
    const businessRepository = this.dataSource.getRepository(Business)
    const queryBuilder = businessRepository.createQueryBuilder('Business')
    await queryBuilder.orderBy('Business.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBusinesss(params: {
    business_id: string
    start_date: Date
    end_date: Date
    business_type: string
  }): Promise<Business[]> {
    const { business_id, start_date, end_date, business_type } = params

    const BusinesssRepository = this.dataSource.getRepository(Business)
    const queryBuilder = BusinesssRepository.createQueryBuilder('Business')

    await queryBuilder
      .where('Business.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('Business.business_type = :business_type', {
        business_type: business_type
      })
      .andWhere('Business.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('Business.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('Business.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBusinessById(id: string): Promise<Business | unknown> {
    const businessRepository = this.dataSource.getRepository(Business)
    return await businessRepository.find({ where: { id: id } })
  }

  public async updateBusiness(id: string, updates: Partial<Business>): Promise<void> {
    const businessRepository = this.dataSource.getRepository(Business)

    try {
      // Find Business with the provided id
      const BusinessToUpdate = await businessRepository.findOne({ where: { id: id } })
      // Update the Business with the provided updates
      Object.assign(BusinessToUpdate || {}, updates)
      console.log(BusinessToUpdate)

      // Save the updated Business
      await businessRepository.save(BusinessToUpdate || {})

      console.log(`Business updated successfully:`, BusinessToUpdate)
    } catch (error) {
      console.error('Error updating Business:', error)
      throw error
    }
  }

  public async deleteBusiness(id): Promise<unknown> {
    const businessRepository = this.dataSource.getRepository(Business)
    return await businessRepository.delete(id)
  }
}
