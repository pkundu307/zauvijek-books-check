import Database from '../config/db'
import { CustomiseInvoice } from './customise_invoice.entity'

export default class CustomiseInvoiceService extends Database {
  constructor() {
    super()
    this.init()
    this.createCustomiseInvoice = this.createCustomiseInvoice.bind(this)
    this.getCustomiseInvoices = this.getCustomiseInvoices.bind(this)
    this.getCustomiseInvoiceById = this.getCustomiseInvoiceById.bind(this)
    this.updateCustomiseInvoice = this.updateCustomiseInvoice.bind(this)
    this.deleteCustomiseInvoice = this.deleteCustomiseInvoice.bind(this)
  }

  async createCustomiseInvoice(params: any): Promise<CustomiseInvoice []> {
    const customiseInvoiceRepository = this.dataSource.getRepository(CustomiseInvoice)
    const newCustomiseInvoice = customiseInvoiceRepository.create(params)
    await customiseInvoiceRepository.save(newCustomiseInvoice)
    return newCustomiseInvoice
  }

  public async getCustomiseInvoices(params: any): Promise<CustomiseInvoice[]> {
    const customiseInvoiceRepository = this.dataSource.getRepository(CustomiseInvoice)
    const queryBuilder = customiseInvoiceRepository.createQueryBuilder('customise_invoice')

    await queryBuilder
      .where('customise_invoice.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('customise_invoice.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCustomiseInvoiceById(id: string): Promise<CustomiseInvoice | unknown> {
    const customiseInvoiceRepository = this.dataSource.getRepository(CustomiseInvoice)
    return await customiseInvoiceRepository.find({ where: { id: id } })
  }

  public async updateCustomiseInvoice(id: string, updates: Partial<CustomiseInvoice>): Promise<void> {
    const customiseInvoiceRepository = this.dataSource.getRepository(CustomiseInvoice)

    try {
      // Find CustomiseInvoice with the provided id
      const customiseInvoiceToUpdate = await customiseInvoiceRepository.findOne({ where: { id: id } })
      // Update the CustomiseInvoice with the provided updates
      Object.assign(customiseInvoiceToUpdate || [], updates)

      // Save the updated CustomiseInvoice
      await customiseInvoiceRepository.save(customiseInvoiceToUpdate || {})
    } catch (error) {
      console.error('Error updating CustomiseInvoice:', error)
      throw error
    }
  }

  public async deleteCustomiseInvoice(id): Promise<unknown> {
    const customiseInvoiceRepository = this.dataSource.getRepository(CustomiseInvoice)
    return await customiseInvoiceRepository.delete(id)
  }
}
