const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('musicAPI', {
    // getFolder:() => ipcRenderer.invoke('get-music-folder'), // maybe something for later, cant find a way to make this work
    chooseFolder: () => ipcRenderer.invoke('choose-music-folder'),
    getFiles: () => ipcRenderer.invoke('get-music-files')
})