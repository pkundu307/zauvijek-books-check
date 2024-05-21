import Database from '../../config/db'
import { Sale } from '../../sale/sale/sale.entity'

export default class PartyReportService extends Database {
  constructor() {
    super()
    this.init()
    this.partyReportByItem = this.partyReportByItem.bind(this)
  }

  async partyReportByItem(): Promise<void> {
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')

    await queryBuilder.orderBy('sale.created_at', 'DESC')
    .leftJoinAndSelect('sale.sale_item','sale_item')
    .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
//  'entities' contains all your data
const combinedData: any[] = entities.map((entity: any) => {
  const saleItem = entity.sale_item[0]; // Assuming sale_item is an array and we're interested in the first item
  return {
      business_id: entity.business_id,
      invoice_no: entity.invoice_no,
      party_name: entity.party_name,
      total_amount: entity.total_amount,
      selling_price: saleItem ? saleItem.quantity : null
  };
});

console.log(combinedData); // Print the extracted data to verify


  }
}

