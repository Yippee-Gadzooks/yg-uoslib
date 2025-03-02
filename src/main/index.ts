import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { objectManager, siteManager, userManager, catalogManager } from './api'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
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

  // catalog
  ipcMain.handle('searchMangaObjects', async (_event, query, fields, siteIds) => {
    return await catalogManager.searchMangaObjects(query, fields, siteIds)
  })
  ipcMain.handle('searchAnimeObjects', async (_event, query, fields) => {
    return await catalogManager.searchAnimeObjects(query, fields)
  })
  ipcMain.handle('searchTeams', async (_event, query) => {
    return await catalogManager.searchTeams(query)
  })
  ipcMain.handle('searchCharacter', async (_event, query) => {
    return await catalogManager.searchCharacter(query)
  })
  ipcMain.handle('searchPeople', async (_event, query) => {
    return await catalogManager.searchPeople(query)
  })
  ipcMain.handle('searchFranchise', async (_event, query) => {
    return await catalogManager.searchFranchise(query)
  })
  ipcMain.handle('searchPublisher', async (_event, query) => {
    return await catalogManager.searchPublisher(query)
  })
  ipcMain.handle('searchUser', async (_event, query, sort_by, sort_type) => {
    return await catalogManager.searchUser(query, sort_by, sort_type)
  })

  // object
  ipcMain.handle('getObject', async (_event, fields, model, slug_id) => {
    return await objectManager.getObject(fields, model, slug_id)
  })
  ipcMain.handle('getObjectRelations', async (_event, model, slug_id) => {
    return await objectManager.getObjectRelations(model, slug_id)
  })
  ipcMain.handle('getObjectSimilar', async (_event, model, slug_id) => {
    return await objectManager.getObjectSimilar(model, slug_id)
  })
  ipcMain.handle('getEpisodes', async (_event, model, slug_id) => {
    return await objectManager.getEpisodes(model, slug_id)
  })
  ipcMain.handle('getEpisode', async (_event, model, episode) => {
    return await objectManager.getEpisode(model, episode)
  })

  // user
  ipcMain.handle('getUser', async (_event, fields, user_id) => {
    return await userManager.getUser(fields, user_id)
  })
  ipcMain.handle('getUserStats', async (_event, user_id) => {
    return await userManager.getUserStats(user_id)
  })
  ipcMain.handle('getUserBookmarks', async (_event, page, sort_by, sort_type, status, user_id) => {
    return await userManager.getUserBookmarks(page, sort_by, sort_type, status, user_id)
  })
  ipcMain.handle('getUserComments', async (_event, page, sort_by, sort_type, user_id) => {
    return await userManager.getUserComments(page, sort_by, sort_type, user_id)
  })
  ipcMain.handle('getUserFriendship', async (_event, page, status, user_id) => {
    return await userManager.getUserFriendship(page, status, user_id)
  })

  createWindow()

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
