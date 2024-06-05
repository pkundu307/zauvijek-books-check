import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater';
import log from 'electron-log/main';
import icon from '../../resources/icon.ico?asset'
const remoteMain = require('@electron/remote/main')
const path = require('node:path')
const iconPath = path.join(__dirname,"build","icon.png")

log.transports.file.resolvePath=()=>path.join('C:\Users\pkund\OneDrive\Desktop\ecom\check','logs/main.log');
log.info('hello,log')
log.warn('some problem')
/* add this before the enable function */
remoteMain.initialize()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 900,
    // height: 670,
    //show: false,
    autoHideMenuBar: true,
    fullscreen: false,
    resizable:true,
    icon: iconPath,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  remoteMain.enable(mainWindow.webContents)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.setThumbarButtons([
    {
      tooltip: 'button1',
      icon: nativeImage.createFromPath(path.join(__dirname, './icon.ico')),
      click () { console.log('button1 clicked') }
    }])

 // mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'allow' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  autoUpdater.checkForUpdatesAndNotify()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
autoUpdater.on("update-available",()=>{
  log.info('update-available');
})
autoUpdater.on("download-progress",()=>{
  log.info('download-progress');
})
autoUpdater.on("update-downloaded",()=>{
  log.info("update-downloaded");
})