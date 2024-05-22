import { machineId, machineIdSync } from 'node-machine-id'

export async function getMachineIdAsync() {
  const id = await machineId()
  return id
}

export function getMachineIdSync() {
  const id = machineIdSync()
  return id
}
