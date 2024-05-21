import Database from '../../config/db'
import { ExpenseItem } from './expense_item.entity'

export default class ExpenseService extends Database {
  constructor() {
    super()
    this.init()
    this.createExpenseItem = this.createExpenseItem.bind(this)
    this.getExpenseItems = this.getExpenseItems.bind(this)
    this.getExpenseItemById = this.getExpenseItemById.bind(this)
    // this.updateExpenseItem = this.updateExpenseItem.bind(this)
    this.deleteExpenseItem = this.deleteExpenseItem.bind(this)
  }

  async createExpenseItem(params: any): Promise<ExpenseItem []> {
    const expenseItemRepository = this.dataSource.getRepository(ExpenseItem)
    const newExpenseItem = expenseItemRepository.create(params)
    await expenseItemRepository.save(newExpenseItem)
    return newExpenseItem
  }

  public async getExpenseItems(params: any): Promise<ExpenseItem[]> {
    const itemRepository = this.dataSource.getRepository(ExpenseItem)
    const queryBuilder = itemRepository.createQueryBuilder('expense')

    await queryBuilder
      .leftJoinAndSelect('expense.expense', 'expense_item')
      .where('expense.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('expense.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getExpenseItemById(id: string): Promise<ExpenseItem | unknown> {
    const expenseItemRepository = this.dataSource.getRepository(ExpenseItem)
    return await expenseItemRepository.findOne( {where:{expense_item_id:id}})
  }

  // public async updateExpenseItem(id: string, updates: Partial<ExpenseItem>): Promise<void> {
  //   const ExpenseItemRepository = this.dataSource.getRepository(ExpenseItem)

  //   try {
  //     // Find ExpenseItem with the provided id
  //     const ExpenseItemToUpdate = await ExpenseItemRepository.findOne({ where: { id: id } })
  //     // Update the ExpenseItem with the provided updates
  //     Object.assign(ExpenseItemToUpdate || [], updates)

  //     // Save the updated ExpenseItem
  //     await ExpenseItemRepository.save(ExpenseItemToUpdate || {})
  //   } catch (error) {
  //     console.error('Error updating ExpenseItem:', error)
  //     throw error
  //   }
  // }

  public async deleteExpenseItem(id): Promise<unknown> {
    const expenseItemRepository = this.dataSource.getRepository(ExpenseItem)
    return await expenseItemRepository.delete(id)
  }
}
