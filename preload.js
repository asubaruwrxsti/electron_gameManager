const { contextBridge, ipcRenderer } = require('electron')
// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electronAPI', {
    login: (username, password) => {
        ipcRenderer.send('login', username, password)
    },
    on: (channel, func) => {
        const validChannels = ['login_response']
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
})