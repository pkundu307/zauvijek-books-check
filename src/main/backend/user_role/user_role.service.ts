import Database from '../config/db'
import { UserRole } from './user_role.entity'

export default class UserRoleService extends Database {
  constructor() {
    super()
    this.init()
    this.createUserRole = this.createUserRole.bind(this)
    this.getUserRole = this.getUserRole.bind(this)
    this.getUserRoleById = this.getUserRoleById.bind(this)
    this.updateUserRole = this.updateUserRole.bind(this)
    this.deleteUserRole = this.deleteUserRole.bind(this)
  }

  async createUserRole(params: any): Promise<UserRole []> {UserRole
    const userRoleRepository = this.dataSource.getRepository(UserRole)
    const newUserRole = userRoleRepository.create(params)
    await userRoleRepository.save(newUserRole)
    return newUserRole
  }

  public async getUserRole(params: any): Promise<UserRole[]> {
    const userRoleRepository = this.dataSource.getRepository(UserRole)
    const queryBuilder = userRoleRepository.createQueryBuilder('userRole')

    await queryBuilder
      .where('userRole.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('userRole.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getUserRoleById(id: string): Promise<UserRole | unknown> {
    const userRoleRepository = this.dataSource.getRepository(UserRole)
    return await userRoleRepository.find({ where: { id: id } })
  }

  public async updateUserRole(id: string, updates: Partial<UserRole>): Promise<void> {
    const userRoleRepository = this.dataSource.getRepository(UserRole)

    try {
      // Find userRole with the provided id
      const userRoleToUpdate = await userRoleRepository.findOne({ where: { id: id } })
      // Update the userRole with the provided updates
      Object.assign(userRoleToUpdate || [], updates)

      // Save the updated userRole
      await userRoleRepository.save(userRoleToUpdate || {})
    } catch (error) {
      console.error('Error updating userRole:', error)
      throw error
    }
  }

  public async deleteUserRole(id): Promise<unknown> {
    const userRoleRepository = this.dataSource.getRepository(UserRole)
    return await userRoleRepository.delete(id)
  }
}
