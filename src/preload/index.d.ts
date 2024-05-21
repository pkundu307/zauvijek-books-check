import { ElectronAPI } from '@electron-toolkit/preload'

import { ZauvijekAPI } from 'src/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    ZauvijekAPI: ZauvijekAPI
  }
}
