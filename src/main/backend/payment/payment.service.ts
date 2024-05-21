import Database from '../config/db'
import { Payment } from './payment.entity'

export default class PaymentService extends Database {
  constructor() {
    super()
    this.init()
    this.createPayment = this.createPayment.bind(this)
    this.getPayments = this.getPayments.bind(this)
    this.getPaymentById = this.getPaymentById.bind(this)
    this.updatePayment = this.updatePayment.bind(this)
    this.deletePayment = this.deletePayment.bind(this)
    this.getAll = this.getAll.bind(this)

  }

  async createPayment(params: any): Promise<Payment []> {
    const paymentRepository = this.dataSource.getRepository(Payment)
    const newPayment = paymentRepository.create(params)
    await paymentRepository.save(newPayment)
    return newPayment
  }

  public async getAll(): Promise<Payment[]> {
    const paymentsRepository = this.dataSource.getRepository(Payment)
    const queryBuilder = paymentsRepository.createQueryBuilder('payment')
    await queryBuilder.orderBy('payment.created_at', 'DESC').getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }


  public async getPayments(params: {
    business_id: string
    start_date: Date
    end_date: Date
    payment_type: string
  }): Promise<Payment[]> {
    const { business_id, start_date, end_date, payment_type } = params

    const paymentsRepository = this.dataSource.getRepository(Payment)
    const queryBuilder = paymentsRepository.createQueryBuilder('payment')

    await queryBuilder
      .where('payment.business_id = :business_id', {
        business_id: business_id
      })
      .andWhere('payment.payment_type = :payment_type', {
        payment_type: payment_type
      })
      .andWhere('payment.created_at >= :start_date', {
        start_date: start_date
      })
      .andWhere('payment.created_at <= :end_date', {
        end_date: end_date
      })
      .orderBy('payment.created_at', 'DESC')
      .getMany()

    const { entities } = await queryBuilder.getRawAndEntities()

    return entities
  }
  

  public async getPaymentById(id: string): Promise<Payment | unknown> {
    const paymentRepository = this.dataSource.getRepository(Payment)
    return await paymentRepository.find({ where: { id: id } })
  }

  public async updatePayment(id: string, updates: Partial<Payment>): Promise<void> {
    const paymentRepository = this.dataSource.getRepository(Payment)

    try {
      // Find Payment with the provided id
      const paymentToUpdate = await paymentRepository.findOne({ where: { id: id } })
      // Update the Payment with the provided updates
      Object.assign(paymentToUpdate || {}, updates)
     

      // Save the updated Payment
      await paymentRepository.save(paymentToUpdate || {})

  
    } catch (error) {
      console.error('Error updating Payment:', error)
      throw error
    }
  }

  public async deletePayment(id): Promise<unknown> {
    const paymentRepository = this.dataSource.getRepository(Payment)
    return await paymentRepository.delete(id)
  }
}
