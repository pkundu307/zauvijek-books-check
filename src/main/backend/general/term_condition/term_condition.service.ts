import Database from '../../config/db';
import { TermCondition } from './term_condition.entity';
export default class TermConditionService extends Database {
  constructor() {
    super();
    this.init();
    this.createTermCondition = this.createTermCondition.bind(this);
    this.getTermConditions = this.getTermConditions.bind(this);
    this.getTermConditionById = this.getTermConditionById.bind(this);
    this.updateTermCondition = this.updateTermCondition.bind(this);
    this.deleteTermCondition = this.deleteTermCondition.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createTermCondition(params: any): Promise<TermCondition []> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition);
    const newTermCondition = termConditionRepository.create(params);
    await termConditionRepository.save(newTermCondition);
    return newTermCondition;
  }

  public async getAll(): Promise<TermCondition[]> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition)
    const queryBuilder = termConditionRepository.createQueryBuilder('term_condition')
    await queryBuilder.orderBy('term_condition.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getTermConditions(params: any): Promise<TermCondition[]> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition);
    const queryBuilder = termConditionRepository.createQueryBuilder('term_condition')

    await queryBuilder
      .where('Term_condition.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('Term_condition.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getTermConditionById(id: string): Promise<TermCondition | unknown> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition);
    return await termConditionRepository.find({ where: { id: id } });
  }

  public async updateTermCondition(id: string, updates: Partial<TermCondition>): Promise<void> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition)

    try {
      // Find TermCondition with the provided id
      const termConditionToUpdate = await termConditionRepository.findOne({ where: { id: id } })
      // Update the TermCondition with the provided updates
      Object.assign(termConditionToUpdate || {}, updates)
      console.log(termConditionToUpdate)

      // Save the updated TermCondition
      await termConditionRepository.save(termConditionToUpdate || {})

      console.log(`TermCondition updated successfully:`, termConditionToUpdate)
    } catch (error) {
      console.error('Error updating TermCondition:', error)
      throw error
    }
  }

  public async deleteTermCondition(id): Promise<unknown> {
    const termConditionRepository = this.dataSource.getRepository(TermCondition)
    return await termConditionRepository.delete(id)
  }
}
