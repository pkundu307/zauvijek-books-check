import Database from '../../config/db'
import { Sale } from '../../sale/sale/sale.entity'

export default class BillReportService extends Database {
  constructor() {
    super()
    this.init()
  }

  async billWiseProfitReport(params: { start_date: Date; end_date: Date }): Promise<void> {
    const { start_date, end_date } = params
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')

    await queryBuilder
      .where('sale.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('sale.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('sale.created_at', 'DESC')
      .leftJoinAndSelect('sale.sale_additional_charge', 'sale_additional_charge')
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_payment_mode', 'sale_payment_mode')
      .leftJoinAndSelect('sale.sale_tax', 'sale_tax')
      .getMany()
    const { entities } = await queryBuilder.getRawAndEntities()
    const combinedData: any[] = entities.map((entity: any) => {
      const saleItem = entity.sale_item[0] // Assuming sale_item is an array and we're interested in the first item
      return {
        date:entity.created_at,
        invoice_no: entity.invoice_no,
        party_name: entity.party_name,
        invoice_amount: entity.total_amount,
        purchase_amount: saleItem ? saleItem.purchase_price : null,
        sales_amount: saleItem ? saleItem.selling_price : null,
        profit : entity.purchase_price-entity.selling_price
      }
    })

    console.log(combinedData)
  }
}
