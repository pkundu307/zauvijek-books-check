import Database from '../config/db'
import { UserApproval } from './user_approval.entity'

export default class UserApprovalService extends Database {
  constructor() {
    super()
    this.init()
    this.createUserApproval = this.createUserApproval.bind(this)
    this.getUserApproval = this.getUserApproval.bind(this)
    this.getUserApprovalById = this.getUserApprovalById.bind(this)
    this.updateUserApproval = this.updateUserApproval.bind(this)
    this.deleteUserApproval = this.deleteUserApproval.bind(this)
  }

  async createUserApproval(params: any): Promise<UserApproval []> {
    const userApprovalRepository = this.dataSource.getRepository(UserApproval)
    const newUserApproval = userApprovalRepository.create(params)
    await userApprovalRepository.save(newUserApproval)
    return newUserApproval
  }

  public async getUserApproval(params: any): Promise<UserApproval[]> {
    const userApprovalRepository = this.dataSource.getRepository(UserApproval)
    const queryBuilder = userApprovalRepository.createQueryBuilder('userApproval')

    await queryBuilder
      .where('userApproval.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('userApproval.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getUserApprovalById(id: string): Promise<UserApproval | unknown> {
    const userApprovalRepository = this.dataSource.getRepository(UserApproval)
    return await userApprovalRepository.find({ where: { id: id } })
  }

  public async updateUserApproval(id, params): Promise<UserApproval | unknown> {
    const userApprovalRepository = this.dataSource.getRepository(UserApproval)

    const updatedPayment = await userApprovalRepository.preload(params)

    if (updatedPayment === undefined) {
      throw new Error('Payment cannot be undefined')
    }

    await userApprovalRepository.save(updatedPayment)
    return await this.getUserApprovalById(id)
  }

  public async deleteUserApproval(id): Promise<unknown> {
    const userApprovalRepository = this.dataSource.getRepository(UserApproval)
    return await userApprovalRepository.delete(id)
  }
}
