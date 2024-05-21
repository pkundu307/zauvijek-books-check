import Database from '../../config/db'
import { Marketing } from './marketing.entity'

export default class MarketingService extends Database {
  constructor() {
    super()
    this.init()
    this.createMarketing = this.createMarketing.bind(this)
    this.getMarketings = this.getMarketings.bind(this)
    this.getMarketingById = this.getMarketingById.bind(this)
    this.getAll = this.getAll.bind(this)
    this.updateMarketing = this.updateMarketing.bind(this)
    this.deleteMarketing = this.deleteMarketing.bind(this)
  }

  async createMarketing(params: any): Promise<Marketing[]> {
    const marketingRepository = this.dataSource.getRepository(Marketing)
    const newMarketing = marketingRepository.create(params)
    await marketingRepository.save(newMarketing)
    // newExpe = 'Example Item' // Example item_name
    return newMarketing
  }

  public async getMarketings(params: {
    business_id: string
    start_date: Date
    end_date: Date
    campaign_type: string
  }): Promise<Marketing[]> {
    const { business_id, start_date, end_date, campaign_type } = params

    const marketingRepository = this.dataSource.getRepository(Marketing)
    const queryBuilder = marketingRepository.createQueryBuilder('marketing')

    await queryBuilder
      .where('marketing.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('marketing.campaign_type = :campaign_type', {
        campaign_type: campaign_type
      })
      .andWhere('marketing.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('marketing.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('marketing.marketing_list', 'marketing_list')
      .orderBy('marketing.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAll(): Promise<Marketing[]> {
    const marketingRepository = this.dataSource.getRepository(Marketing)
    const queryBuilder = marketingRepository.createQueryBuilder('marketing')
    await queryBuilder.orderBy('marketing.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getMarketingById(id: string): Promise<Marketing | unknown> {
    const marketingRepository = this.dataSource.getRepository(Marketing)
    return await marketingRepository.find({ where: { id: id } })
  }

  public async updateMarketing(id: string, updates: Partial<Marketing>): Promise<void> {
    const marketingRepository = this.dataSource.getRepository(Marketing)

    try {
      // Find Marketing with the provided id
      const marketingToUpdate = await marketingRepository.findOne({ where: { id: id } })
      // Update the Marketing with the provided updates
      Object.assign(marketingToUpdate || {}, updates)
      console.log(marketingToUpdate)

      // Save the updated Marketing
      await marketingRepository.save(marketingToUpdate || {})

      console.log(`Marketing updated successfully:`, marketingToUpdate)
    } catch (error) {
      console.error('Error updating Marketing:', error)
      throw error
    }
  }

  public async deleteMarketing(id): Promise<unknown> {
    const marketingRepository = this.dataSource.getRepository(Marketing)
    return await marketingRepository.delete(id)
  }
}
