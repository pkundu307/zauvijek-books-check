import { machineId, machineIdSync } from 'node-machine-id'

import Database from '../config/db'
import UserService from '../user/user.service'

export async function getMachineIdAsync() {
  const id = await machineId()
  return id
}

export function getMachineIdSync() {
  const id = machineIdSync()
  return id
}

const user = new UserService()

export default class AuthService extends Database {
  constructor() {
    super()
    this.init()
    this.userSignUp = this.userSignUp.bind(this)
    this.userSignIn = this.userSignIn.bind(this)
  }

  async userSignUp(params: any): Promise<unknown> {
    const newUser = await user.createUser(params)
    return newUser
  }

  async userSignIn(): Promise<unknown> {
    const machineId = await getMachineIdAsync()

    // const newUser = await user.getUserByEmail(params)
    console.log('')
    return machineId
  }
}
