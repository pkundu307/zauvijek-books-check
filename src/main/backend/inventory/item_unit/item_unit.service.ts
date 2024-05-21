import Database from '../../config/db'
import { item_unit } from './item_unit.entity'


export default class itemUnitService extends Database {
  constructor() {
    super()
    this.init()
    this.createItemUnit = this.createItemUnit.bind(this)
    // this.getItemUnits = this.getItemUnits.bind(this)
  }

  async createItemUnit(params: any): Promise<item_unit []> {
    const itemUnitRepository = this.dataSource.getRepository(item_unit)
    const newItemUnit = itemUnitRepository.create(params)
    await itemUnitRepository.save(newItemUnit)
    return newItemUnit
  }

  // public async getItemUnits(): Promise<item_unit[]> {
  //   const itemCountRepository = this.dataSource.getRepository(item_unit)
  //   const queryBuilder = itemCountRepository.createQueryBuilder('item_unit')

  //   await queryBuilder
  //   .getMany()
  //   const itemUnitCount = await queryBuilder.getCount()
  //   const { entities } = await queryBuilder.getRawAndEntities()

  //   return { itemUnitCount, entities }
  // }
}