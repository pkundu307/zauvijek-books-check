import Database from '../../config/db'
import { Item } from '../../inventory/item/item.entity'

export default class itemService extends Database {
  constructor() {
    super()
    this.init()
    this.itemBatchReport = this.itemBatchReport.bind(this)
  }

  async itemBatchReport(params: { start_date: Date; end_date: Date }): Promise<void> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    const { start_date, end_date } = params
    start_date.setHours(0, 0, 0, 0)
    end_date.setHours(23, 59, 59, 999)
    await queryBuilder
      .orderBy('item.created_at', 'DESC')
      .where('item.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('item.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
    //  'entities' contains all your data
    const combinedData: any[] = entities.map((entity: any) => {
      const itemBatch = entity.item_batching[0] // Assuming sale_item is an array and we're interested in the first item
      return {
        item_name: entity.item_name,
        batch_no: itemBatch ? itemBatch.batch_no : null,
        expiry_date: itemBatch ? itemBatch.expiry_date : null,
        manufacturinh_date: itemBatch ? itemBatch.manufacture_date : null,
        MRP: itemBatch ? itemBatch.mrp : null,
        purchase_price: itemBatch ? itemBatch.purchase_price : null,
        selling_price: itemBatch ? itemBatch.selling_price : null,
        current_stock: itemBatch ? `${itemBatch.opening_stock} - ${itemBatch.closing_stock}` : null
      }
    })
    console.log(combinedData)
  }

  async lowStockSummery(params: { start_date: Date; end_date: Date }): Promise<void> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    const { start_date, end_date } = params
    await queryBuilder
      .orderBy('item.created_at', 'DESC')
      .where('item.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('item.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
    //  'entities' contains all your data
    const combinedData: any[] = entities.map((entity: any) => {
      // const itemBatch = entity.item_batching[0] // Assuming sale_item is an array and we're interested in the first item
      return {
        item_name: entity.item_name,
        item_code: entity.item_code
      }
    })
    console.log(combinedData)
  }

  async stockSummery(params: { start_date: Date; end_date: Date }): Promise<void> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    const { start_date, end_date } = params
    await queryBuilder
      .orderBy('item.created_at', 'DESC')
      .where('item.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('item.created_at <= :end_date', {
        end_date: end_date
      })
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()
    //  'entities' contains all your data
    const combinedData: any[] = entities.map((entity: any) => {
      const itemBatch = entity.item_batching[0] // Assuming sale_item is an array and we're interested in the first item
      return {
        item_name: entity.item_name,
        batch_number: itemBatch ? itemBatch.batch_no : null,
        item_code: entity.item_code,
        purchase_price: itemBatch ? itemBatch.purchase_price:null,
        selling_price:itemBatch ? itemBatch.selling_price :null,
        
      }
    })
    console.log(combinedData)
  }
  
}
