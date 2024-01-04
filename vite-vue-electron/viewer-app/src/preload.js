// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 console.log('preload is executing...')
 console.log(import.meta.env.VITE_API_TEST)
 console.log('...well')
 console.log('import.meta.env.VITE_API_PATH_TO_FILES: ', import.meta.env.VITE_API_PATH_TO_FILES, '<-- PRELOAD')
/*  import { ipcRenderer, contextBridge } from "electron";
contextBridge.exposeInMainWorld('exposed', {
    onGetData:  () => { ipcRenderer.on('send-smth',(e, _v)=> { return'x' }) },
    sara: ()=> {return 'Conor'}
})  */