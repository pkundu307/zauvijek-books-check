import Database from '../config/db'
import { Notification } from './notification.entity'

export default class NotificationService extends Database {
  constructor() {
    super()
    this.init()
    this.createNotification = this.createNotification.bind(this)
    this.getNotifications = this.getNotifications.bind(this)
    this.getNotificationById = this.getNotificationById.bind(this)
    this.updateNotification = this.updateNotification.bind(this)
    this.deleteNotification = this.deleteNotification.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  async createNotification(params: any): Promise<Notification []> {
    const notificationRepository = this.dataSource.getRepository(Notification)
    const newNotification = notificationRepository.create(params)
    await notificationRepository.save(newNotification)
    return newNotification
  }

  public async getAll(): Promise<Notification[]> {
    const notificationRepository = this.dataSource.getRepository(Notification)
    const queryBuilder = notificationRepository.createQueryBuilder('notification')
    await queryBuilder.orderBy('notification.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getNotifications(params: {
    business_id: string
    start_date: Date
    end_date: Date
    feature_type: string
  }): Promise<Notification[]> {
    const { business_id, start_date, end_date, feature_type } = params

    const notificationRepository = this.dataSource.getRepository(Notification)
    const queryBuilder = notificationRepository.createQueryBuilder('notification')

    await queryBuilder
      .where('notification.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('notification.feature_type = :feature_type', {
        feature_type: feature_type
      })
      .andWhere('notification.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('notification.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('notification.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }

  public async getNotificationById(id: string): Promise<Notification | unknown> {
    const notificationRepository = this.dataSource.getRepository(Notification)
    return await notificationRepository.find({ where: { id: id } })
  }

  public async updateNotification(id: string, updates: Partial<Notification>): Promise<void> {
    const notificationRepository = this.dataSource.getRepository(Notification)

    try {
      // Find notification with the provided id
      const notificationToUpdate = await notificationRepository.findOne({ where: { id: id } })
      // Update the notification with the provided updates
      Object.assign(notificationToUpdate || {}, updates)

      // Save the updated notification
      await notificationRepository.save(notificationToUpdate || {})

    } catch (error) {
      console.error('Error updating notification:', error)
      throw error
    }
  }

  public async deleteNotification(id): Promise<unknown> {
    const notificationRepository = this.dataSource.getRepository(Notification)
    return await notificationRepository.delete(id)
  }
}
