import Database from '../../config/db'
import { Expense } from './expense.entity'

export default class ExpenseService extends Database {
  constructor() {
    super()
    this.init()
    this.createExpense = this.createExpense.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
    this.getExpenseById = this.getExpenseById.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
    this.deleteExpense = this.deleteExpense.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createExpense(params: any): Promise<Expense []> {
    const expenseRepository = this.dataSource.getRepository(Expense)
    const newExpense = expenseRepository.create(params)
    await expenseRepository.save(newExpense)
    // newExpe = 'Example Item' // Example item_name
    return newExpense
  }

  public async getExpenses(params: {
    business_id: string
    start_date: Date
    end_date: Date
  }): Promise<Expense[]> {
    const { business_id, start_date, end_date } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)
    const expenseRepository = this.dataSource.getRepository(Expense)
    const queryBuilder = expenseRepository.createQueryBuilder('expense')

    await queryBuilder
      .where('expense.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('expense.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('expense.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('expense.expense_item','expense_item')
      .orderBy('expense.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getExpenseById(id: string): Promise<Expense | unknown> {
    const expenseRepository = this.dataSource.getRepository(Expense)
    const queryBuilder = expenseRepository.createQueryBuilder('expense')
    const expense= await queryBuilder
    .leftJoinAndSelect('expense.expense_item','expense_item')
      .where('expense.id = :id', { id })
      .getOne()

    return expense
  }
  public async getAll(): Promise<Expense[]> {
    const expenseRepository = this.dataSource.getRepository(Expense)
    const queryBuilder = expenseRepository.createQueryBuilder('expense')
    await queryBuilder.
    leftJoinAndSelect('expense.expense_item','expense_item')
    .orderBy('expense.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
  public async updateExpense(id: string, updates: Partial<Expense>): Promise<void> {
    const expenseRepository = this.dataSource.getRepository(Expense)

    try {
      // Find Expense with the provided id
      const expenseToUpdate = await expenseRepository.findOne({ where: { id: id } })
      // Update the Expense with the provided updates
      Object.assign(expenseToUpdate || {}, updates)

      // Save the updated Expense
      await expenseRepository.save(expenseToUpdate || {})

  
    } catch (error) {
      console.error('Error updating Expense:', error)
      throw error
    }
  }
  public async deleteExpense(id): Promise<unknown> {
    const expenseRepository = this.dataSource.getRepository(Expense)
    return await expenseRepository.delete(id)
  }
}
