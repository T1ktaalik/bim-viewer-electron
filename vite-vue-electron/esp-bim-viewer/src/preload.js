// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const path = require('node:path')
import { ContextBridge, contextBridge } from 'electron'
const rootDirectory = path.resolve(__dirname, '../', '../', 'src/')
const normalizedRootDirectory = path.normalize(rootDirectory)
contextBridge.exposeInIsolatedWorld('preloaderInterfaces', {
    normalizedRootDirectory: () => { return normalizedRootDirectory }
})