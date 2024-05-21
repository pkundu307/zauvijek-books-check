import Database from '../../config/db'
import { stock_activity } from './stock_activity.entity'


export default class stockactivityService extends Database {
  constructor() {
    super()
    this.init()
    this.createStockActivity = this.createStockActivity.bind(this)
    this.getStockActivities = this.getStockActivities.bind(this)
  }

  async createStockActivity(params: any): Promise<stock_activity[]> {
    const stockActivityRepository = this.dataSource.getRepository(stock_activity)
    // Create a new stock_activity entity
    const newStockActivity = stockActivityRepository.create(params)

    await stockActivityRepository.save(newStockActivity)

    return newStockActivity
  }

  public async getStockActivities(params:any): Promise<any> {
    const stockActivityRepository = this.dataSource.getRepository(stock_activity)
    const queryBuilder = stockActivityRepository.createQueryBuilder('stock_activity')

    await queryBuilder
    .where('stock_activity.business_id = :business_id', {
      business_id: params.business_id
    })
    .orderBy('stock_activity.created_at', 'DESC')
    .getMany()
    const stock_activityCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities()

    return { stock_activityCount, entities }
  }
}