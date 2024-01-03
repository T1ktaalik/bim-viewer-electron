// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { rootPath } from 'electron-root-path'
const rootPath = require('electron-root-path').rootPath;
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('testMessage', {
    text: 'So the string has been delivered. i am wondering I can do more...',
    pathData: rootPath
})