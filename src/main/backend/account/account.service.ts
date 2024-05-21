import Database from '../config/db'
import { Account } from './account.entity'

export default class AccountService extends Database {
  constructor() {
    super()
    this.init()
    this.createAccount = this.createAccount.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.getAccountById = this.getAccountById.bind(this)
    this.updateAccount = this.updateAccount.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createAccount(params: any): Promise<Account[]> {
    const accountRepository = this.dataSource.getRepository(Account)
    const newAccount = accountRepository.create(params)
    await accountRepository.save(newAccount)
    return newAccount
  }

  public async getAll(): Promise<Account[]> {
    const accountRepository = this.dataSource.getRepository(Account)
    const queryBuilder = accountRepository.createQueryBuilder('account')
    await queryBuilder.orderBy('account.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAccounts(params: {
    business_id: string
  }): Promise<Account[]> {
    const { business_id } = params

    const accountRepository = this.dataSource.getRepository(Account)
    const queryBuilder = accountRepository.createQueryBuilder('account')

    await queryBuilder
      .where('account.business_id = :business_id', {
        business_id: business_id
      })
      .orderBy('account.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAccountById(id: string): Promise<Account | unknown> {
    const accountRepository = this.dataSource.getRepository(Account)
    return await accountRepository.find({ where: { id: id } })
  }

  public async updateAccount(id: string, updates: Partial<Account>): Promise<any> {
    const accountRepository = this.dataSource.getRepository(Account)

    try {
      // Find Account with the provided id
      const accountToUpdate = await accountRepository.findOne({ where: { id: id } })
      // Update the Account with the provided updates
      Object.assign(accountToUpdate || {}, updates)
     

      // Save the updated Account
      await accountRepository.save(accountToUpdate ||{})

   
    } catch (error) {
      console.error('Error updating Account:', error)
      throw error
    }
  }

  public async deleteAccount(id): Promise<unknown> {
    const accountRepository = this.dataSource.getRepository(Account)
    return await accountRepository.delete(id)
  }
}
