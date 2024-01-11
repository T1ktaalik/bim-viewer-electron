// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

/* const path = require('path') */
/* import { path } from 'path'
import { contextBridge } from 'electron'
const rootDirectory = path.resolve(__dirname, '../', '../', 'src/')
const normalizedRootDirectory = path.normalize(rootDirectory)
contextBridge.exposeInIsolatedWorld('preloaderInterfaces', {
    normalizedRootDirectory: () => { return normalizedRootDirectory }
}) */
const contextBridge = require('electron')
const path = require('path')
const rootDirectory = path.resolve(__dirname, '../', '../', 'src/')
const normalizedRootDirectory = path.normalize(rootDirectory)
console.log(rootDirectory)
console.log(normalizedRootDirectory)
if (contextBridge) {
    console.log(typeof contextBridge)
} else {
    console.log('No contextBridge')
}
console.log(contextBridge)
/* contextBridge.exposeInMainWorld('preloaderInterfaces',{
    message: () => { return 'a message string'}
}) */
/* const rootDirectory = path.resolve(__dirname, '../', '../', 'src/')
const normalizedRootDirectory = path.normalize(rootDirectory)
contextBridge.exposeInIsolatedWorld('preloaderInterfaces', {
    normalizedRootDirectory: () => { return normalizedRootDirectory }
}) */
console.log('********************preloader******************')
