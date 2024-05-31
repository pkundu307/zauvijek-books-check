import Database from '../../config/db'
import { Purchase } from '../../purchase/purchase/purchase.entity'
import { Sale } from '../../sale/sale/sale.entity'

export default class GstReportService extends Database {
  constructor() {
    super()
    this.init()
    this.GstPurchaseWithHSN = this.GstPurchaseWithHSN.bind(this)
    this.gstSaleWithHSN = this.gstSaleWithHSN.bind(this)
    this.gstr1 = this.gstr1.bind(this)
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
  async gstr1(params: { start_date: Date; end_date: Date }):Promise<void>{
    const { start_date, end_date } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)
    const saleRepository = this.dataSource.getRepository(Sale)
    const queryBuilder = saleRepository.createQueryBuilder('sale')

    await queryBuilder
      .orderBy('sale.created_at', 'DESC')
      .where('sale.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('sale.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('sale.sale_item', 'sale_item')
      .leftJoinAndSelect('sale.sale_additional_charge','sale_additional_charge')
      .leftJoinAndSelect('sale.sale_payment_mode','sale_payment_mode')
      .leftJoinAndSelect('sale.sale_tax','sale_tax')
      .getMany()

      const { entities } = await queryBuilder.getRawAndEntities()
      console.log(entities,'e');
      
      const combinedData: any[] = entities.map((entity: any) => {
        const saleItem = entity.sale_item[0] // Assuming sale_item is an array and we're interested in the first item
        const saleTax = entity.sale_tax[0]
        // Assuming sale_item is an array and we're interested in the first item
        return {
          SGST:saleTax?saleTax.sgst:null,
          CGST:saleTax?saleTax.cgst:null,
          IGST :saleTax?saleTax.igst:null,
          CESS : saleTax?saleTax.cess :null,
          total:saleTax?saleTax.total:null,
          coustomer_name:entity.party_name,
          state_name : entity.billing_address,
          invoice_date:entity.created_at,
          taxable_value : saleTax?saleTax.taxable_amount:null,
          
        }
      })
      console.log(combinedData)

  }
}
