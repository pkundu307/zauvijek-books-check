import Database from '../../config/db';
import { PrefixNumber } from './prefix_number.entity';
export default class PrefixNumberervice extends Database {
  constructor() {
    super();
    this.init();
    this.createPrefixNumber = this.createPrefixNumber.bind(this);
    this.getPrefixNumbers = this.getPrefixNumbers.bind(this);
    this.getPrefixNumberById = this.getPrefixNumberById.bind(this);
    this.updatePrefixNumber = this.updatePrefixNumber.bind(this);
    this.deletePrefixNumber = this.deletePrefixNumber.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createPrefixNumber(params: any): Promise<PrefixNumber []> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber);
    const newPrefixNumber = prefixNumberRepository.create(params);
    await prefixNumberRepository.save(newPrefixNumber);
    return newPrefixNumber;
  }

  public async getAll(): Promise<PrefixNumber[]> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber)
    const queryBuilder = prefixNumberRepository.createQueryBuilder('prefix_number')
    await queryBuilder.orderBy('prefix_number.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getPrefixNumbers(params: any): Promise<PrefixNumber[]> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber);
    const queryBuilder = prefixNumberRepository.createQueryBuilder('prefix_number')

    await queryBuilder
      .where('prefix_number.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('prefix_number.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getPrefixNumberById(id: string): Promise<PrefixNumber | unknown> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber);
    return await prefixNumberRepository.find({ where: { id: id } });
  }

  public async updatePrefixNumber(id: string, updates: Partial<PrefixNumber>): Promise<void> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber)

    try {
      // Find PrefixNumber with the provided id
      const prefixNumberToUpdate = await prefixNumberRepository.findOne({ where: { id: id } })
      // Update the PrefixNumber with the provided updates
      Object.assign(prefixNumberToUpdate || {}, updates)
      console.log(prefixNumberToUpdate)

      // Save the updated PrefixNumber
      await prefixNumberRepository.save(prefixNumberToUpdate || {})

      console.log(`PrefixNumber updated successfully:`, prefixNumberToUpdate)
    } catch (error) {
      console.error('Error updating PrefixNumber:', error)
      throw error
    }
  }

  public async deletePrefixNumber(id): Promise<unknown> {
    const prefixNumberRepository = this.dataSource.getRepository(PrefixNumber)
    return await prefixNumberRepository.delete(id)
  }
}
