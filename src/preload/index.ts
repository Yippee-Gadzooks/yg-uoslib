import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as dotenv from 'dotenv'

// Custom APIs for renderer
const api = {}
dotenv.config()
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('env', {
      USER_ID: process.env.USER_ID
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
