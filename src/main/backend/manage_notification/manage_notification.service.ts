import Database from '../config/db';
import { ManageNotification } from './manage_notification.entity';
export default class ManageNotificationService extends Database {
  constructor() {
    super();
    this.init();
    this.createManageNotification = this.createManageNotification.bind(this);
    this.getManageNotifications = this.getManageNotifications.bind(this);
    this.getManageNotificationById = this.getManageNotificationById.bind(this);
    this.updateManageNotification = this.updateManageNotification.bind(this);
    this.deleteManageNotification = this.deleteManageNotification.bind(this);
    this.getAll = this.getAll.bind(this)

  }

  async createManageNotification(params: any): Promise<ManageNotification []> {
    const manageNotificationRepository = this.dataSource.getRepository(ManageNotification);
    const newManageNotification = manageNotificationRepository.create(params);
    await manageNotificationRepository.save(newManageNotification);
    return newManageNotification;
  }

  public async getManageNotifications(params: any): Promise<ManageNotification[]> {
    const manageNotificationRepository = this.dataSource.getRepository(ManageNotification);
    const queryBuilder = manageNotificationRepository.createQueryBuilder('manage_notification')

    await queryBuilder
      .where('manage_notification.business_id = :business_id', {
        business_id: params.business_id
      })
      .orderBy('manage_notification.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getManageNotificationById(id: string): Promise<ManageNotification | unknown> {
    const manageNotificationRepository = this.dataSource.getRepository(ManageNotification);
    return await manageNotificationRepository.find({ where: { id: id } });
  }

  public async getAll(): Promise<ManageNotification[]> {
    const namageNotificationRepository = this.dataSource.getRepository(ManageNotification)
    const queryBuilder = namageNotificationRepository.createQueryBuilder('manage_notification')
    await queryBuilder
    .orderBy('manage_notification.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async updateManageNotification(id: string, updates: Partial<ManageNotification>): Promise<void> {
    const manageNotificationRepository = this.dataSource.getRepository(ManageNotification)

    try {
      // Find ManageNotification with the provided id
      const manageNotificationToUpdate = await manageNotificationRepository.findOne({ where: { id: id } })
      // Update the ManageNotification with the provided updates
      Object.assign(manageNotificationToUpdate || [], updates)

      // Save the updated ManageNotification
      await manageNotificationRepository.save(manageNotificationToUpdate || {})
    } catch (error) {
      console.error('Error updating ManageNotification:', error)
      throw error
    }
  }

  public async deleteManageNotification(id): Promise<unknown> {
    const manageNotificationRepository = this.dataSource.getRepository(ManageNotification)
    return await manageNotificationRepository.delete(id)
  }
}
