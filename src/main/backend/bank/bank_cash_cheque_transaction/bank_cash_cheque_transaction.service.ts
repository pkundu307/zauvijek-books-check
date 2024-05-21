import Database from '../../config/db';
import { BankCashChequeTransaction } from './bank_cash_cheque_transaction.entity';
export default class BankCashChequeService extends Database {
  constructor() {
    super();
    this.init();
    this.createBankCashChequeTransaction = this.createBankCashChequeTransaction.bind(this);
    this.getBankCashChequeTransactions = this.getBankCashChequeTransactions.bind(this);
    this.getBankCashChequeTransactionById = this.getBankCashChequeTransactionById.bind(this);
    this.updateBankCashChequeTransaction = this.updateBankCashChequeTransaction.bind(this);
    this.deleteBankCashChequeTransaction = this.deleteBankCashChequeTransaction.bind(this);
  }

  async createBankCashChequeTransaction(params: any): Promise<BankCashChequeTransaction[]> {
    const BankCashChequeTransactionRepository = this.dataSource.getRepository(BankCashChequeTransaction);
    const newBankCashChequeTransaction = BankCashChequeTransactionRepository.create(params);
    await BankCashChequeTransactionRepository.save(newBankCashChequeTransaction);
    return newBankCashChequeTransaction;
  }

  public async getBankCashChequeTransactions(params: {
    business_id: string
    start_date: Date
    end_date: Date
    transaction_type: string
  }): Promise<BankCashChequeTransaction[]> {
    const { business_id, start_date, end_date, transaction_type } = params

    const BankCashChequeTransactionsRepository = this.dataSource.getRepository(BankCashChequeTransaction)
    const queryBuilder = BankCashChequeTransactionsRepository.createQueryBuilder('bank_cash_cheque_transaction')

    await queryBuilder
      .where('bank_cash_cheque_transaction.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('bank_cash_cheque_transaction.transaction_type = :transaction_type', {
        transaction_type: transaction_type
      })
      .andWhere('bank_cash_cheque_transaction.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('bank_cash_cheque_transaction.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('bank_cash_cheque_transaction.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBankCashChequeTransactionById(id: string): Promise<BankCashChequeTransaction | unknown> {
    const BankCashChequeTransactionRepository = this.dataSource.getRepository(BankCashChequeTransaction);
    return await BankCashChequeTransactionRepository.find({ where: { id: id } });
  }

  public async updateBankCashChequeTransaction(id: string, updates: Partial<BankCashChequeTransaction>): Promise<void> {
    const BankCashChequeTransactionRepository = this.dataSource.getRepository(BankCashChequeTransaction)

    try {
      // Find BankCashChequeTransaction with the provided id
      const bankCashChequeTransactionToUpdate = await BankCashChequeTransactionRepository.findOne({ where: { id: id } })
      // Update the BankCashChequeTransaction with the provided updates
      Object.assign(bankCashChequeTransactionToUpdate ||{}, updates)

      // Save the updated BankCashChequeTransaction
      await BankCashChequeTransactionRepository.save(bankCashChequeTransactionToUpdate || {})

    } catch (error) {
      console.error('Error updating Bank Cash Cheque Transaction:', error)
      throw error
    }
  }

  public async deleteBankCashChequeTransaction(id): Promise<unknown> {
    const BankCashChequeTransactionRepository = this.dataSource.getRepository(BankCashChequeTransaction)
    return await BankCashChequeTransactionRepository.delete(id)
  }
}
