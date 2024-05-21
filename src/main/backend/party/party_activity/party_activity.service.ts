import Database from '../../config/db'
import { PartyActivity } from './party_activity.entity'

export default class PartyActivityService extends Database {
  constructor() {
    super()
    this.init()
    this.createPartyActivity = this.createPartyActivity.bind(this)
    this.getPartyActivities = this.getPartyActivities.bind(this)
    this.deletePartyActivity = this.deletePartyActivity.bind(this)
    this.updatePartyActivity = this.updatePartyActivity.bind(this)
    // this.getPartyActivityById = this.getPartyActivityById.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async createPartyActivity(params: any): Promise<PartyActivity []> {
    try {
      const partyActivityRepository = this.dataSource.getRepository(PartyActivity)
      const newPartyActivity = partyActivityRepository.create(params)
      const savedPartyActivity = await partyActivityRepository.save(newPartyActivity)
      return savedPartyActivity
    } catch (error) {
      console.error('Error creating party:', error)
      throw error
    }
  }
  public async getAll(): Promise<PartyActivity[]> {
    const partyActivityRepository = this.dataSource.getRepository(PartyActivity)
    const queryBuilder = partyActivityRepository.createQueryBuilder('partyActivity')
    await queryBuilder.orderBy('partyActivity.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
  async getPartyActivities(params: {
    business_id: string
  }): Promise<PartyActivity[]> {
    const { business_id } = params

    const partyActivityRepository = this.dataSource.getRepository(PartyActivity)
    const queryBuilder = partyActivityRepository.createQueryBuilder('partyActivity')

    await queryBuilder
      .where('partyActivity.business_id = :business_id', {
        business_id: business_id
      })
      .orderBy('partyActivity.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  async deletePartyActivity(id: string): Promise<void> {
    try {
      const partyActivityRepository =this.dataSource.getRepository(PartyActivity)
      await partyActivityRepository.delete(id)
      console.log('PartyActivity deleted successfully')
    } catch (error) {
      console.error('Error deleting party:', error)
      throw error
    }
  }

  async updatePartyActivity(id: string, updates: Partial<PartyActivity>): Promise<void> {
    try {
      const partyActivityRepository =this.dataSource.getRepository(PartyActivity)
      await partyActivityRepository.update(id, updates)
    } catch (error) {
      console.error('Error updating party:', error)
      throw error
    }
  }

  // async getPartyActivityById(id: string): Promise<PartyActivity | undefined> {
  //   try {
  //     const partyActivityRepository =this.dataSource.getRepository(PartyActivity)
  //     const partyActivity = await partyActivityRepository.findOne({ where: { id: id }})
  //     return partyActivity
  //   } catch (error) {
  //     console.error('Error getting partyActivity by ID:', error)
  //     throw error
  //   }
  // }
}
