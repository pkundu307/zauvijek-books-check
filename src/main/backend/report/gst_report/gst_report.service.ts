import Database from '../../config/db'
import { Purchase } from '../../purchase/purchase/purchase.entity'
import { Sale } from '../../sale/sale/sale.entity'

export default class GstReportService extends Database {
  constructor() {
    super()
    this.init()
    this.GstPurchaseWithHSN = this.GstPurchaseWithHSN.bind(this)
  }

  async GstPurchaseWithHSN(): Promise<void> {
    const purchaseRepository = this.dataSource.getRepository(Purchase)
    const queryBuilder = purchaseRepository.createQueryBuilder('purchase')

    await queryBuilder
      .orderBy('purchase.created_at', 'DESC')
      .leftJoinAndSelect('purchase.purchase_item', 'purchase_item')
      .leftJoinAndSelect('purchase.purchase_additional_charge','purchase_additional_charge')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
    //  'entities' contains all your data
    const combinedData: any[] = entities.map((entity: any) => {
      const purchaseItem = entity.purchase_item[0]
      const purchaseAdditionalCharge = entity.purchase_additional_charge[0]
      return {
        created_at: entity.created_at,
        invoice_no: entity.invoice_no,
        original_invoice_no: entity.invoice_no,
        party_name: entity.party_name,
        item_name:purchaseItem ? purchaseItem.item_name:null,
        priceByUnit : `${entity.price}/${entity.unit}`,
        HSN_CODE:purchaseItem ? purchaseItem.hsn_code : null,
        quantity:purchaseItem ? purchaseItem.quantity:null,
        amount:purchaseAdditionalCharge ? purchaseAdditionalCharge.amount:null
      }
    })

    console.log(combinedData)
  }

  async gstSaleWithHSN(): Promise<void>{
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')

    await queryBuilder
      .orderBy('sale.created_at', 'DESC')
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_additional_charge','sale_additional_charge')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
    //  'entities' contains all your data
    const combinedData: any[] = entities.map((entity: any) => {
      const saleItem = entity.sale_item[0]
      const saleAdditionalCharge = entity.sale_additional_charge[0]
      return {
        created_at: entity.created_at,
        invoice_no: entity.invoice_no,
        original_invoice_no: entity.invoice_no,
        party_name: entity.party_name,
        item_name:saleItem ? saleItem.item_name:null,
        priceByUnit : `${entity.price}/${entity.unit}`,
        HSN_CODE:saleItem ? saleItem.hsn_code : null,
        quantity:saleItem ? saleItem.quantity:null,
        amount:saleAdditionalCharge ? saleAdditionalCharge.amount:null
      }
    })

    console.log(combinedData)
  }
}
