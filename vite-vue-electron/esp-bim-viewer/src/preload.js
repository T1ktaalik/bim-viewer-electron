// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const contextBridge = require('electron').contextBridge
const path = require('path')
const rootDirectory = path.resolve(__dirname, '../', '../', 'src/')
const normalizedRootDirectory = path.normalize(rootDirectory)

contextBridge.exposeInMainWorld('customInterfaces', {
    interfaceRootDirectory: () => { return normalizedRootDirectory }
})

