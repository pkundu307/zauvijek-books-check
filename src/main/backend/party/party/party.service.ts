import Database from '../../config/db'
import { Party } from './party.entity'

export default class PartyService extends Database {
  constructor() {
    super()
    this.init()
    this.createParty = this.createParty.bind(this)
    this.getParties = this.getParties.bind(this)
    this.deleteParty = this.deleteParty.bind(this)
    this.updateParty = this.updateParty.bind(this)
    this.getPartyById = this.getPartyById.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  public async createParty(params: any): Promise<Party []> {
    try {
      const partyRepository = this.dataSource.getRepository(Party)

      // Create a new Party entity
      const newParty = partyRepository.create(params)

      // Save the new Party
      const savedParty = await partyRepository.save(newParty)

      return savedParty
    } catch (error) {
      // Handle errors appropriately
      console.error('Error creating Party:', error)
      throw error
    }
  }
  public async getAll(): Promise<Party[]> {
    const partyRepository = this.dataSource.getRepository(Party)
    const queryBuilder = partyRepository.createQueryBuilder('party')
    await queryBuilder.orderBy('party.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
  async getParties(params: { business_id: string }): Promise<Party[]> {
    const { business_id } = params

    const partyRepository = this.dataSource.getRepository(Party)
    const queryBuilder = partyRepository.createQueryBuilder('party')

    await queryBuilder
      .where('party.business_id = :business_id', {
        business_id: business_id
      })
      .orderBy('party.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
  async deleteParty(id: string): Promise<void> {
    const partyRepository = this.dataSource.getRepository(Party)
    try {
      // Delete the account using its ID
      const result = await partyRepository.delete(id)
      console.log('business deleted successfully:', result)
    } catch (error) {
      console.error('Error deleting business:', error)
      throw error
    }
  }
  async updateParty(id: string, updates: Partial<Party>): Promise<void> {
    const partyRepository = this.dataSource.getRepository(Party)

    try {
      const partyToUpdate = await partyRepository.findOne({ where: { id: id } })

      Object.assign(partyToUpdate || {}, updates)
      // // Save the updated account
      await partyRepository.save(partyToUpdate || {})
    } catch (error) {
      console.error('Error updating account user_id:', error)
      throw error
    }
  }
  async getPartyById(id: string): Promise<any> {
    const partyRepository = this.dataSource.getRepository(Party)

    const queryBuilder = partyRepository.createQueryBuilder('party')

    const party = await queryBuilder.where('party.id= :id', { id }).getOne()

    return party
  }
}
