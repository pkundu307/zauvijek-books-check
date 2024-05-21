import Database from '../../config/db'
import { ItemBatching } from '../item_batching/item_batching.entity'
import { ItemSerialisation } from '../item_serialisation/item_serialisation.entity'
import { Item } from './item.entity'

export default class ItemService extends Database {
  constructor() {
    super()
    this.init()
    this.createItem = this.createItem.bind(this)
    this.getItems = this.getItems.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.getItemById = this.getItemById.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getSyncStatus = this.getSyncStatus.bind(this)
    this.setAllSyncedTrue = this.setAllSyncedTrue.bind(this)
  }

  async createItem(params: any): Promise<Item []> {
    const itemRepository = this.dataSource.getRepository(Item)
    // Create a new Item entity
    const newItem = itemRepository.create(params)
    await itemRepository.save(newItem)
    return newItem
  }

  public async getAll(): Promise<Item[]> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    await queryBuilder
      .leftJoinAndSelect('item.item_serialisation', 'item_serialisation')
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .orderBy('item.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getItems(params: { business_id: string }): Promise<Item[]> {
    const { business_id } = params

    const ItemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = ItemRepository.createQueryBuilder('item')

    await queryBuilder
      .where('item.business_id = :business_id', {
        business_id: business_id
      })
      .orderBy('item.created_at', 'DESC')
      .leftJoinAndSelect('item.item_serialisation', 'item_serialisation')
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .getMany()
    // const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async deleteItem(id: string): Promise<any> {
    const itemRepository = this.dataSource.getRepository(Item)
    const itemBatchingRepository = this.dataSource.getRepository(ItemBatching)
    const itemSerialisationRepository = this.dataSource.getRepository(ItemSerialisation)
    await itemSerialisationRepository.delete({ item: { id } })
    await itemBatchingRepository.delete({ item: { id } })
    return await itemRepository.delete(id)
  }
  public async updateItem(id: string, updates: Partial<Item>): Promise<void | null> {
    const itemRepository = this.dataSource.getRepository(Item)
    // const itemBatchingRepository = this.dataSource.getRepository(ItemBatching)
    // const itemSerialisationRepository = this.dataSource.getRepository(ItemSerialisation)
    try {
      // Find the item by id
      const itemToUpdate = await itemRepository.findOne({ where: { id: id } })

      // If item with the given name doesn't exist, return null
      if (!itemToUpdate) {
        return null
      }

      Object.assign(itemToUpdate, updates)
      // Save the changes to the database
      await itemRepository.save(itemToUpdate)
    } catch (error) {
      console.error('Error updating item:', error)
      return null
    }
  }
  public async getItemById(id: string): Promise<Item | any> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    const item = await queryBuilder
      .leftJoinAndSelect('item.item_serialisation', 'item_serialisation')
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .where('item.id = :id', { id })
      .getOne()

    return item
  }

  public async getSyncStatus(): Promise<Item | any> {
    const itemRepository = this.dataSource.getRepository(Item)
    const queryBuilder = itemRepository.createQueryBuilder('item')
    queryBuilder.where('item.is_synced = :isSynced', { isSynced: false }).getMany()
    await queryBuilder
      .leftJoinAndSelect('item.item_serialisation', 'item_serialisation')
      .leftJoinAndSelect('item.item_batching', 'item_batching')
      .getMany()
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities()

    return { itemCount, entities }
  }

  public async setAllSyncedTrue(): Promise<void> {
    const itemRepository = this.dataSource.getRepository(Item)
    const unsyncedItems = await itemRepository.find({ where: { is_synced: false } })

    await Promise.all(
      unsyncedItems.map(async (item) => {
        item.is_synced = true
        await itemRepository.save(item)
      })
    )
  }
}
