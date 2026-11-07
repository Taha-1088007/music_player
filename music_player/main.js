const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')
const fs= require('node:fs/promises')
const {pathToFileURL} = require('node:url');

// Create music player window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 450,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html') //load the html page of music player
}

// Get the path of the settings file
const settingsPath = () =>
  path.join(app.getPath('userData'), 'settings.json')

// get music folder
ipcMain.handle('get-music-folder', async () => {
  try {
    const data = await fs.readFile(settingsPath(), 'utf8')
    return JSON.parse(data).musicFolder
  } catch {
    return null
  }
})

// choose the folder and save it
ipcMain.handle('choose-music-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (result.canceled || !result.filePaths.length) {
    return null
  }

  const folder = result.filePaths[0] // store the selected folder path

    // save the selected folder path in settings.json
  await fs.mkdir(app.getPath('userData'), { recursive: true })
  await fs.writeFile(
    settingsPath(),
    JSON.stringify({ musicFolder: folder })
  )

  return folder
})

// Read the saved music folder
async function getSavedFolder() {
  try {
    const data = await fs.readFile(settingsPath(), 'utf8')
    // return saved folder path, or null if its missing
    return JSON.parse(data).musicFolder || null
  } catch {
    return null
  }
}

// Get all the mp3 files from folder
ipcMain.handle('get-music-files', async () => {
    const folder = await getSavedFolder();  // get the saved folder

    if (!folder) return [] // return an empty list if no longer folder has been saved

    // read the contents of the music folder
    const entries = await fs.readdir(folder, {
        withFileTypes:true
    })

    // select only mp3 files
    return entries
        .filter(entry =>
        entry.isFile() &&
        /\.(mp3)$/i.test(entry.name)
        )
        .map(entry =>({
                name: entry.name,
                url: pathToFileURL(path.join(folder, entry.name)).href
        }))

})

// Start the application
app.whenReady().then(() => {
  createWindow()

});