import Database from '../config/db';
import { ReferEarn } from './refer_earn.entity';

export default class ReferEarnService extends Database {
  constructor() {
    super();
    this.init();
    this.createReferEarn = this.createReferEarn.bind(this);
    this.getReferEarns = this.getReferEarns.bind(this);
    this.getReferEarnById = this.getReferEarnById.bind(this);
    this.updateReferEarn = this.updateReferEarn.bind(this);
    this.deleteReferEarn = this.deleteReferEarn.bind(this);
    this.getAll = this.getAll.bind(this)

  }

  async createReferEarn(params: any): Promise<ReferEarn []> {
    const referEarnRepository = this.dataSource.getRepository(ReferEarn);
    const newReferEarn = referEarnRepository.create(params);
    await referEarnRepository.save(newReferEarn);
    return newReferEarn;
  }

  public async getReferEarns(params: {
    business_id: string
    start_date: Date
    end_date: Date
  }): Promise<ReferEarn[]> {
    const { business_id, start_date, end_date } = params

    const referEarnRepository = this.dataSource.getRepository(ReferEarn)
    const queryBuilder = referEarnRepository.createQueryBuilder('refer_earn')

    await queryBuilder
      .where('refer_earn.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('refer_earn.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('refer_earn.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('refer_earn.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAll(): Promise<ReferEarn[]> {
    const referEarnRepository = this.dataSource.getRepository(ReferEarn)
    const queryBuilder = referEarnRepository.createQueryBuilder('refer_earn')
    await queryBuilder.orderBy('refer_earn.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getReferEarnById(id: string): Promise<ReferEarn | unknown> {
    const referEarnRepository = this.dataSource.getRepository(ReferEarn);
    return await referEarnRepository.find({ where: { id: id } })
  }

  public async updateReferEarn(id: string, updates: Partial<ReferEarn>): Promise<void> {
    const ReferEarnRepository = this.dataSource.getRepository(ReferEarn)

    try {
      // Find ReferEarn with the provided id
      const referEarnToUpdate = await ReferEarnRepository.findOne({ where: { id: id } })
      // Update the ReferEarn with the provided updates
      Object.assign(referEarnToUpdate || {}, updates)


      // Save the updated ReferEarn
      await ReferEarnRepository.save(referEarnToUpdate || {})


    } catch (error) {
      console.error('Error updating Refer Earn:', error)
      throw error
    }
  }

  public async deleteReferEarn(id: string): Promise<unknown> {
    const referEarnRepository = this.dataSource.getRepository(ReferEarn);
    return await referEarnRepository.delete(id);
  }
}
