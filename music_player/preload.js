const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('musicAPI', {
    getFolder:() => ipcRenderer.invoke('get-music-folder'),
    chooseFolder: () => ipcRenderer.invoke('choose-music-folder'),
    getFiles: () => ipcRenderer.invoke('get-music-files')
})