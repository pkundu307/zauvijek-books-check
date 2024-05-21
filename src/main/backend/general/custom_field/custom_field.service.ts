import Database from '../../config/db';
import { CustomField } from './custom_field.entity';
export default class CustomFieldervice extends Database {
  constructor() {
    super();
    this.init();
    this.createCustomField = this.createCustomField.bind(this);
    this.getCustomFields = this.getCustomFields.bind(this);
    this.getCustomFieldsById = this.getCustomFieldsById.bind(this);
    this.updateCustomField = this.updateCustomField.bind(this);
    this.deleteCustomField = this.deleteCustomField.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createCustomField(params: any): Promise<CustomField []> {
    const customFieldRepository = this.dataSource.getRepository(CustomField);
    const newCustomField = customFieldRepository.create(params);
    await customFieldRepository.save(newCustomField);
    return newCustomField;
  }

  public async getAll(): Promise<CustomField[]> {
    const customFieldRepository = this.dataSource.getRepository(CustomField)
    const queryBuilder = customFieldRepository.createQueryBuilder('custom_field')
    await queryBuilder.orderBy('custom_field.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCustomFields(params: any): Promise<CustomField[]> {
    const customFieldRepository = this.dataSource.getRepository(CustomField);
    const queryBuilder = customFieldRepository.createQueryBuilder('Custom_field')

    await queryBuilder
      .where('Custom_field.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('Custom_field.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCustomFieldsById(id: string): Promise<CustomField | unknown> {
    const customFieldRepository = this.dataSource.getRepository(CustomField);
    return await customFieldRepository.find({ where: { id: id } });
  }

  public async updateCustomField(id: string, updates: Partial<CustomField>): Promise<void> {
    const customFieldRepository = this.dataSource.getRepository(CustomField)

    try {
      // Find CustomField with the provided id
      const customFieldToUpdate = await customFieldRepository.findOne({ where: { id: id } })
      // Update the CustomField with the provided updates
      Object.assign(customFieldToUpdate || [], updates)

      // Save the updated CustomField
      await customFieldRepository.save(customFieldToUpdate || {})
    } catch (error) {
      console.error('Error updating CustomField:', error)
      throw error
    }
  }
  public async deleteCustomField(id): Promise<unknown> {
    const customFieldRepository = this.dataSource.getRepository(CustomField)
    return await customFieldRepository.delete(id)
  }
}
