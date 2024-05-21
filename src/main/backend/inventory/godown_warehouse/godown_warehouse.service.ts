import Database from '../../config/db'
import { GodownWarehouse } from './godown_warehouse.entity'

export default class GodownWarehouseService extends Database {
  constructor() {
    super()
    this.init()
    this.createGodownWarehouse = this.createGodownWarehouse.bind(this)
    this.getGodownWarehouses = this.getGodownWarehouses.bind(this)
    this.getGodownWarehousesById = this.getGodownWarehousesById.bind(this)
    this.updateGodownWarehouse = this.updateGodownWarehouse.bind(this)
    this.deleteGodownWarehouse = this.deleteGodownWarehouse.bind(this)
  }

  async createGodownWarehouse(params: any): Promise<GodownWarehouse []> {
    const godownWarehouseRepository = this.dataSource.getRepository(GodownWarehouse)
    const newGodownWarehouse = godownWarehouseRepository.create(params)
    await godownWarehouseRepository.save(newGodownWarehouse)
    return newGodownWarehouse
  }

  public async getGodownWarehouses(params: any): Promise<GodownWarehouse[]> {
    const godownWarehouseRepository = this.dataSource.getRepository(GodownWarehouse)
    const queryBuilder = godownWarehouseRepository.createQueryBuilder('godownWarehouse')

    await queryBuilder
      .where('godownWarehouse.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('godownWarehouse.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getGodownWarehousesById(id: string): Promise<GodownWarehouse | unknown> {
    const godownWarehouseRepository = this.dataSource.getRepository(GodownWarehouse)
    return await godownWarehouseRepository.find({ where: { id: id } })
  }

  public async updateGodownWarehouse(id: string, updates: Partial<GodownWarehouse>): Promise<void> {
    const godownWarehouseRepository = this.dataSource.getRepository(GodownWarehouse)

    try {
      // Find GodownWarehouse with the provided id
      const godownWarehouseToUpdate = await godownWarehouseRepository.findOne({ where: { id: id } })
      // Update the GodownWarehouse with the provided updates
      Object.assign(godownWarehouseToUpdate || {}, updates)

      // Save the updated GodownWarehouse
      await godownWarehouseRepository.save(godownWarehouseToUpdate|| {})

    } catch (error) {
      console.error('Error updating GodownWarehouse:', error)
      throw error
    }
  }

  public async deleteGodownWarehouse(id): Promise<unknown> {
    const godownWarehouseRepository = this.dataSource.getRepository(GodownWarehouse)
    return await godownWarehouseRepository.delete(id)
  }
}