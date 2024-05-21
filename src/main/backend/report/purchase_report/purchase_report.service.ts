import Database from '../../config/db'
import { Purchase } from '../../purchase/purchase/purchase.entity'

export default class purchaseReportService extends Database {
  constructor() {
    super()
    this.init()
    this.purchaseSummery=this.purchaseSummery.bind(this)
  }
  async purchaseSummery(params: { start_date: Date; end_date: Date }): Promise<void> {
    const { start_date, end_date } = params
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')

    await queryBuilder
      .orderBy('purchase.created_at', 'DESC')
      .leftJoinAndSelect('purchase.purchase_additional_charge', 'purchase_additional_charge')
      .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
      .leftJoinAndSelect('purchase.purchase_payment_mode', 'purchase_payment_mode')
      .leftJoinAndSelect('purchase.purchase_tax', 'purchase_tax')
      .where('purchase.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('purchase.created_at <= :end_date', {
        end_date: end_date
      })
      .getMany()

      const { entities } = await queryBuilder.getRawAndEntities()

      const combinedData: any[] = entities.map((entity: any) => {
        // Assuming sale_item is an array and we're interested in the first item
        return {
            party_name: entity.party_name,
            purchase_amount: entity.total_amount,
            original_invoice_no: entity.invoice_no,
            notes:entity.notes,
            purchase_date:entity.created_at
        };
      });
      console.log(combinedData);
      
  }
}
