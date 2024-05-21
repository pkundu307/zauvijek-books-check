import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { services } from '../main/backend'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

const ZauvijekAPI = {
  services
}

contextBridge.exposeInMainWorld('ZauvijekAPI', ZauvijekAPI)

export type ZauvijekAPI = typeof ZauvijekAPI
