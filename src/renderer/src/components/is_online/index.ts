import { publicIp } from 'public-ip'

export default async function isOnline(options?: any) {
  options = {
    timeout: 5000,
    ipVersion: 4,
    ...options
  }

  if (!navigator?.onLine) {
    return { isOnline: false, ip: undefined }
  }

  try {
    const ip = await publicIp(options)
    return { isOnline: true, ip }
  } catch {
    return { isOnline: false, ip: undefined }
  }
}
