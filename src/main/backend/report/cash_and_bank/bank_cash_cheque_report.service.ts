import Database from '../../config/db'
import { BankCashCheque } from '../../bank/bank_cash_cheque/bank_cash_cheque.entity'

export default class bankCashChequeReportService extends Database{
    constructor(){
        super()
        this.init()
    }
    async cashAndBankReport (params: {
        start_date: Date
        end_date: Date
      }):Promise<void>{
        const { start_date, end_date } = params
        start_date.setHours(0, 0, 0, 0)
        end_date.setHours(23, 59, 59, 999)
        const bankCashChequeRepository = this.dataSource.getRepository(BankCashCheque)
        const queryBuilder = bankCashChequeRepository.createQueryBuilder('bank_cash_cheque')

        await queryBuilder
        .andWhere('bank_cash_cheque.created_at >= :start_date', {
            start_date: start_date
          })
          .andWhere('bank_cash_cheque.created_at <= :end_date', {
            end_date: end_date
          })
          .leftJoinAndSelect('ban_cash_cheque.bank_cash_cheque_transaction','bank_cash_cheque_transaction')
          .orderBy('bank_cash_cheque.created_at', 'DESC')
          .getMany()
    
        const { entities } = await queryBuilder.getRawAndEntities()
        const combinedData: any[] = entities.map((entity: any) => {
            // Assuming sale_item is an array and we're interested in the first item
            const bankCashChequeTransaction = entity.bank_cash_cheque_transaction[0]
            return {
              date: entity.created_at,
              voucher_type: bankCashChequeTransaction?bankCashChequeTransaction.transaction_type:null,
              party:bankCashChequeTransaction?bankCashChequeTransaction.party_name :null,
              paid:bankCashChequeTransaction?bankCashChequeTransaction.paid_amount:null,
              recived: bankCashChequeTransaction?bankCashChequeTransaction.recived_amount:null,
              balance: bankCashChequeTransaction?bankCashChequeTransaction.balance_amount:null,
              
            }
          })
          console.log(combinedData)
      }
}