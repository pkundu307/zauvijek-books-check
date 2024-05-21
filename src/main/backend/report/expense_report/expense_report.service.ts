import Database from '../../config/db'
import { Expense } from '../../expense/expense/expense.entity'

export default class ExpenseReportService extends Database {
  constructor() {
    super()
    this.init()
    this.expenseCategoryReport = this.expenseCategoryReport.bind(this)
    this.expenseTransactionReport = this.expenseTransactionReport.bind(this)
  }
  async expenseCategoryReport(params: { start_date: Date; end_date: Date }): Promise<void> {
    const { start_date, end_date } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)
    const expenseRepository = this.dataSource.getRepository(Expense)

    const queryBuilder = expenseRepository
      .createQueryBuilder('expense')
      .where('expense.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('expense.created_at <= :end_date', {
        end_date: end_date
      })
    await queryBuilder.orderBy('expense.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    const combinedData: any[] = entities.map((entity: any) => {
      // Assuming sale_item is an array and we're interested in the first item
      return {
        category: entity.category,
        total_amount: entity.total_amount
      }
    })
    console.log(combinedData)
  }
  async expenseTransactionReport(params: { start_date: Date; end_date: Date }): Promise<void> {
    const { start_date, end_date } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)
    const expenseRepository = this.dataSource.getRepository(Expense)

    const queryBuilder = expenseRepository
      .createQueryBuilder('expense')
      .where('expense.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('expense.created_at <= :end_date', {
        end_date: end_date
      })
    await queryBuilder.orderBy('expense.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    const combinedData: any[] = entities.map((entity: any) => {
      // Assuming sale_item is an array and we're interested in the first item
      return {
        date: entity.created_at,
        expense_no: entity.expense_no,
        category: entity.category,
        payment_mode: entity.payment_mode,
        total_amount: entity.total_amount
      }
    })
    console.log(combinedData)
  }
}
