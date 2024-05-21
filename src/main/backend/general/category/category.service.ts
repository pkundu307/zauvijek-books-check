import Database from '../../config/db';
import { Category } from './category.entity';
export default class Categoryervice extends Database {
  constructor() {
    super();
    this.init();
    this.createCategory = this.createCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategoriesById = this.getCategoriesById.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getAll = this.getAll.bind(this)
  }

  async createCategory(params: any): Promise<Category []> {
    const categoryRepository = this.dataSource.getRepository(Category);
    const newCategory = categoryRepository.create(params);
    await categoryRepository.save(newCategory);
    return newCategory;
  }

  public async getAll(): Promise<Category[]> {
    const categoryRepository = this.dataSource.getRepository(Category)
    const queryBuilder = categoryRepository.createQueryBuilder('category')
    await queryBuilder.orderBy('category.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCategories(params: any): Promise<Category[]> {
    const categoryRepository = this.dataSource.getRepository(Category);
    const queryBuilder = categoryRepository.createQueryBuilder('category')

    await queryBuilder
      .where('category.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('category.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getCategoriesById(id: string): Promise<Category | unknown> {
    const categoryRepository = this.dataSource.getRepository(Category);
    return await categoryRepository.find({ where: { id: id } });
  }

  public async updateCategory(id: string, updates: Partial<Category>): Promise<void> {
    const categoryRepository = this.dataSource.getRepository(Category)

    try {
      // Find Category with the provided id
      const categoryToUpdate = await categoryRepository.findOne({ where: { id: id } })
      // Update the Category with the provided updates
      Object.assign(categoryToUpdate || {}, updates)
      console.log(categoryToUpdate)

      // Save the updated Category
      await categoryRepository.save(categoryToUpdate || {})

      console.log(`Category updated successfully:`, categoryToUpdate)
    } catch (error) {
      console.error('Error updating Category:', error)
      throw error
    }
  }
  public async deleteCategory(id): Promise<unknown> {
    const categoryRepository = this.dataSource.getRepository(Category)
    return await categoryRepository.delete(id)
  }
}
