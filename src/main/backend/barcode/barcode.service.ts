import Database from '../config/db'
import { Barcode } from './barcode.entity'

export default class BarcodeService extends Database {
  constructor() {
    super()
    this.init()
    this.createBarcode = this.createBarcode.bind(this)
    this.getBarcodes = this.getBarcodes.bind(this)
    this.getBarcodeById = this.getBarcodeById.bind(this)
    this.updateBarcode = this.updateBarcode.bind(this)
    this.deleteBarcode = this.deleteBarcode.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createBarcode(params: any): Promise<Barcode[]> {
    const barcodeRepository = this.dataSource.getRepository(Barcode)
    const newBarcode = barcodeRepository.create(params)
    await barcodeRepository.save(newBarcode)
    return newBarcode
  }

  public async getAll(): Promise<Barcode[]> {
    const barcodeRepository = this.dataSource.getRepository(Barcode)
    const queryBuilder = barcodeRepository.createQueryBuilder('barcode')
    await queryBuilder.orderBy('barcode.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBarcodes(params: any): Promise<Barcode[]> {
    const BarcodeRepository = this.dataSource.getRepository(Barcode)
    const queryBuilder = BarcodeRepository.createQueryBuilder('barcode')

    await queryBuilder
      .where('barcode.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('barcode.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getBarcodeById(id): Promise<Barcode | unknown> {
    const barcodeRepository = this.dataSource.getRepository(Barcode)
    return await barcodeRepository.find({ where: { id: id } })
  }

  public async updateBarcode(id: string, updates: Partial<Barcode>): Promise<void> {
    const barcodeRepository = this.dataSource.getRepository(Barcode)

    try {
      // Find Barcode with the provided id
      const BarcodeToUpdate = await barcodeRepository.findOne({ where: { id: id } })
      // Update the Barcode with the provided updates
      Object.assign(BarcodeToUpdate || {}, updates)

      // Save the updated Barcode
      await barcodeRepository.save(BarcodeToUpdate || {})
    } catch (error) {
      console.error('Error updating Barcode:', error)
      throw error
    }
  }

  public async deleteBarcode(id): Promise<unknown> {
    const barcodeRepository = this.dataSource.getRepository(Barcode)
    return await barcodeRepository.delete(id)
  }
}
