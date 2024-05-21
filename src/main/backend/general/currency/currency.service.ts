import Database from '../../config/db';
import { Currency } from './currency.entity';
export default class CurrencyService extends Database {
  constructor() {
    super();
    this.init();
    this.createCurrency = this.createCurrency.bind(this);
    this.getCurrencys = this.getCurrencys.bind(this);
    this.getCurrencyById = this.getCurrencyById.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.deleteCurrency = this.deleteCurrency.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createCurrency(params: any): Promise<Currency []> {
    const currencyRepository = this.dataSource.getRepository(Currency);
    const newCurrency = currencyRepository.create(params);
    await currencyRepository.save(newCurrency);
    return newCurrency;
  }

  public async getAll(): Promise<Currency[]> {
    const currencyRepository = this.dataSource.getRepository(Currency)
    const queryBuilder = currencyRepository.createQueryBuilder('currency')
    await queryBuilder.orderBy('currency.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCurrencys(params: any): Promise<Currency[]> {
    const currencyRepository = this.dataSource.getRepository(Currency);
    const queryBuilder = currencyRepository.createQueryBuilder('currency')

    await queryBuilder
      .where('currency.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('currency.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCurrencyById(id: string): Promise<Currency | unknown> {
    const currencyRepository = this.dataSource.getRepository(Currency);
    return await currencyRepository.find({ where: { id: id } });
  }

  public async updateCurrency(id: string, updates: Partial<Currency>): Promise<void> {
    const currencyRepository = this.dataSource.getRepository(Currency)

    try {
      // Find Currency with the provided id
      const currencyToUpdate = await currencyRepository.findOne({ where: { id: id } })
      // Update the Currency with the provided updates
      Object.assign(currencyToUpdate|| {}, updates)
      console.log(currencyToUpdate)

      // Save the updated Currency
      await currencyRepository.save(currencyToUpdate|| {})

      console.log(`Currency updated successfully:`, currencyToUpdate)
    } catch (error) {
      console.error('Error updating Currency:', error)
      throw error
    }
  }

  public async deleteCurrency(id): Promise<unknown> {
    const currencyRepository = this.dataSource.getRepository(Currency)
    return await currencyRepository.delete(id)
  }
}
