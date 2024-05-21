import Database from '../config/db'
import { User } from './user.entity'

export default class UserService extends Database {
  constructor() {
    super()
    this.init()
    this.createUser = this.createUser.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  async createUser(params: any): Promise<User []> {
    const userRepository = this.dataSource.getRepository(User)
    const newUser = userRepository.create(params)
    await userRepository.save(newUser)
    return newUser
  }

  public async getUsers(): Promise<User[]> {
    const userRepository = this.dataSource.getRepository(User)
    return await userRepository.find()
  }

  public async getUserById(id): Promise<any> {
    const userRepository = this.dataSource.getRepository(User)
    return await userRepository.find({ where: { id: id } })
  }

  public async getUserByEmail(email): Promise<User | null> {
    const userRepository = this.dataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    })

    if (!user) {
      throw new Error('User does not exist')
    }

    return user
  }
}
