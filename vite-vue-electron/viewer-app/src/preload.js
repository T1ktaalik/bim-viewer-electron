// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


 import { ipcRenderer, contextBridge } from "electron";
contextBridge.exposeInMainWorld('exposed', {
    onGetData:  () =>  ipcRenderer.on('send-smth',(e, _v)=> { 'x' })
}) 