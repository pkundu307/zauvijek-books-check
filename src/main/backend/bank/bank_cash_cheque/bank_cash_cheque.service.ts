import Database from '../../config/db'
import { BankCashCheque } from './bank_cash_cheque.entity'

export default class BankCashChequeService extends Database {
  constructor() {
    super()
    this.init()
    this.createBankCashCheque = this.createBankCashCheque.bind(this)
    this.getBankCashCheques = this.getBankCashCheques.bind(this)
    this.getBankCashChequeById = this.getBankCashChequeById.bind(this)
    this.updateBankCashCheque = this.updateBankCashCheque.bind(this)
    this.deleteBankCashCheque = this.deleteBankCashCheque.bind(this)
    this.getAll = this.getAll.bind(this)

  }

  async createBankCashCheque(params: any): Promise<BankCashCheque[]> {
    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
    const newBankCashCheque = bankCashChequeRepository.create(params)
    await bankCashChequeRepository.save(newBankCashCheque)
    return newBankCashCheque
  }

  public async getAll(): Promise<BankCashCheque[]> {
    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
    const queryBuilder = bankCashChequeRepository.createQueryBuilder('bank_cash_cheque')

    await queryBuilder.orderBy('bank_cash_cheque.created_at', 'DESC')
    .leftJoinAndSelect('bank_cash_cheque.bank_cash_cheque_transaction','bank_cash_cheque_transaction')
    .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBankCashCheques(params: {
    business_id: string
    account_type: string
  }): Promise<BankCashCheque[]> {
    const { business_id, account_type } = params

    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
    const queryBuilder = bankCashChequeRepository.createQueryBuilder('bank_cash_cheque')

    await queryBuilder
      .where('bank_cash_cheque.business_id = :business_id', {
        business_id: business_id
      })
      .leftJoinAndSelect('bank_cash_cheque.bank_cash_cheque_transaction','bank_cash_cheque_transaction')
      .andWhere('bank_cash_cheque.account_type = :account_type', {
        account_type: account_type
      })
      .orderBy('bank_cash_cheque.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBankCashChequeById(id): Promise<BankCashCheque | unknown> {
    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
    return await bankCashChequeRepository.find({ where: { id: id } })
  }

  public async updateBankCashCheque(id: string, updates: Partial<BankCashCheque>): Promise<void> {
    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)

    try {
      // Find BankCashCheque with the provided id
      const bankCashChequeToUpdate = await bankCashChequeRepository.findOne({ where: { id: id } })
      // Update the BankCashCheque with the provided updates
      Object.assign(bankCashChequeToUpdate ||[], updates)

      // Save the updated BankCashCheque
      await bankCashChequeRepository.save(bankCashChequeToUpdate ||{})

    } catch (error) {
      console.error('Error updating Bank Cash Cheque:', error)
      throw error
    }
  }

  public async deleteBankCashCheque(id): Promise<unknown> {
    const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
    return await bankCashChequeRepository.delete(id)
  }
}
