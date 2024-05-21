import Database from '../config/db';
import { Warehouse } from './warehouse.entity';

export default class WarehouseService extends Database {
  constructor() {
    super();
    this.init();
    this.createWarehouse = this.createWarehouse.bind(this);
    this.getWarehouses = this.getWarehouses.bind(this);
    this.getWarehouseById = this.getWarehouseById.bind(this);
    this.updateWarehouse = this.updateWarehouse.bind(this);
    this.deleteWarehouse = this.deleteWarehouse.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createWarehouse(params: any): Promise<Warehouse []> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse);
    const newWarehouse = warehouseRepository.create(params);
    await warehouseRepository.save(newWarehouse);
    return newWarehouse;
  }

  public async getWarehouses(params: any): Promise<Warehouse[]> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse);
    const queryBuilder = warehouseRepository.createQueryBuilder('warehouse')

    await queryBuilder
      .where('warehouse.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('warehouse.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getWarehouseById(id: string): Promise<Warehouse | unknown> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse);
    return await warehouseRepository.find({ where: { id: id } });
  }
  
  public async getAll(): Promise<Warehouse[]> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse)
    const queryBuilder = warehouseRepository.createQueryBuilder('warehouse')
    await queryBuilder.orderBy('warehouse.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async updateWarehouse(id: string, updates: Partial<Warehouse>): Promise<void> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse);

    try {
      // Find warehouse with the provided id
      const warehouseToUpdate = await warehouseRepository.findOne({ where: { id: id } })
      // Update the warehouse with the provided updates
      Object.assign(warehouseToUpdate || {}, updates)
      console.log(warehouseToUpdate)

      // Save the updated warehouse
      await warehouseRepository.save(warehouseToUpdate || {})

      console.log(`warehouse updated successfully:`, warehouseToUpdate)
    } catch (error) {
      console.error('Error updating warehouse:', error)
      throw error
    }
  }

  public async deleteWarehouse(id): Promise<unknown> {
    const warehouseRepository = this.dataSource.getRepository(Warehouse)
    return await warehouseRepository.delete(id)
  }
}
