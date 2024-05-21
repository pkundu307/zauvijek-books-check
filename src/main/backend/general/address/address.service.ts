import Database from '../../config/db';
import { Address } from './address.entity';
export default class AddressService extends Database {
  constructor() {
    super();
    this.init();
    this.createAddress = this.createAddress.bind(this);
    this.getAddresss = this.getAddresss.bind(this);
    this.getAddressById = this.getAddressById.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createAddress(params: any): Promise<Address []> {
    const addressRepository = this.dataSource.getRepository(Address);
    const newAddress = addressRepository.create(params);
    await addressRepository.save(newAddress);
    return newAddress;
  }

  public async getAll(): Promise<Address[]> {
    const addressRepository = this.dataSource.getRepository(Address)
    const queryBuilder = addressRepository.createQueryBuilder('address')
    await queryBuilder.orderBy('address.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAddresss(params: any): Promise<Address[]> {
    const addressRepository = this.dataSource.getRepository(Address);
    const queryBuilder = addressRepository.createQueryBuilder('address')

    await queryBuilder
      .where('address.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('address.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getAddressById(id: string): Promise<Address | unknown> {
    const addressRepository = this.dataSource.getRepository(Address);
    return await addressRepository.find({ where: { id: id } });
  }

  public async updateAddress(id: string, updates: Partial<Address>): Promise<void> {
    const addressRepository = this.dataSource.getRepository(Address)

    try {
      // Find Address with the provided id
      const addressToUpdate = await addressRepository.findOne({ where: { id: id } })
      // Update the Address with the provided updates
      Object.assign(addressToUpdate || {}, updates)
      console.log(addressToUpdate)

      // Save the updated Address
      await addressRepository.save(addressToUpdate || {})

      console.log(`Address updated successfully:`, addressToUpdate)
    } catch (error) {
      console.error('Error updating Address:', error)
      throw error
    }
  }

  public async deleteAddress(id): Promise<unknown> {
    const addressRepository = this.dataSource.getRepository(Address)
    return await addressRepository.delete(id)
  }
}
