// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const path = require('node:path');
import { contextBridge } from "electron";
console.log('preload: defining rootDir')
const rootDirectory = path.resolve(__dirname, '../', '../', 'src')
const normalizedRootDirectory = path.normalize(rootDirectory)
contextBridge.exposeInMainWorld('preloaderAPI', {
    rootDirectory: ()=> {return normalizedRootDirectory},
    pathNormalize: (path) => { return path.normalize(path)  }
}) 