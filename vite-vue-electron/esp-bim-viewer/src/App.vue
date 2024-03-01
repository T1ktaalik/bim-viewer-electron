<template>
  <q-layout>
    <q-header>
      <q-toolbar  class="bg-grey-9 text-white text-center">
      <q-btn flat round dense icon="account_tree" @click="isExplorerOpen = !isExplorerOpen" />
      <q-toolbar-title>
        Просмотрщик информационных моделей
      </q-toolbar-title>
      <q-btn flat round dense icon="info" @click="isInspectorOpen = !isInspectorOpen" />
    </q-toolbar>
    </q-header>
   <q-drawer ref="explorer" v-model="isExplorerOpen" class="bg-purple-3">
  <q-tab-panels>
    <q-tab-panel name="Модели"></q-tab-panel>
    <q-tab-panel name="Объекты"></q-tab-panel>
    <q-tab-panel name="Классы"></q-tab-panel>
    <q-tab-panel name="Уровни"></q-tab-panel>
  </q-tab-panels>
  </q-drawer>
   <q-drawer ref="inspector" v-model="isInspectorOpen" side="right" class="bg-red-4"></q-drawer>
   <q-page-container class="bg-blue-2">
    <q-page ref="viewer">
      <q-btn-group ref="viewerToolBar"></q-btn-group>
      <canvas ref="viewerCanvas" id="viewerCanvas"></canvas>
      <canvas ref="navCubeCanvas"></canvas>
    </q-page>
   </q-page-container>
 <!--    <BimViewerComponent class="h-full bg-slate-100	" /> -->
  </q-layout>
 sdk
</template>
<script setup>
// https://mui.com/material-ui/material-icons/?query=tree
//import  BimViewerComponent  from './components/BimViewerComponent.vue';
import { Server } from './assets/xeokit-bim-viewer/src/server/ServerCustom'
import { BIMViewer } from './assets/xeokit-bim-viewer/src/BIMViewerCustom'
import { onMounted, ref } from 'vue'
const isExplorerOpen = ref(true)
const isInspectorOpen = ref(true)
const explorer = ref(null)
const inspector = ref(null)
const viewer = ref(null)
const viewerCanvas = ref(null)
const navCubeCanvas = ref(null)
const viewerToolBar = ref(null)
onMounted(()=>{
  launchViewer()
})
function launchViewer() {
  const projectId = 'Duplex'
  if (!projectId) {
    console.log('projectId is not defined!')
  } else {
    console.log(`projectId is defined as ${projectId}`)
  }
  
  const server = new Server({
    dataDir: window.customInterfaces.rootDirectory() + '/data/ '
  })

  const bimViewer = new BIMViewer(server, {
    canvasElement:/* viewerCanvas, */ document.getElementById('viewerCanvas'),
    keyboardEventsElement: document.getElementById('viewerCanvas'),
    explorerElement: explorer,
    toolbarElement: viewerToolBar,
    inspectorElement: inspector,
    navCubeCanvasElement: navCubeCanvas,
    busyModelBackDropElement: viewer,
    enableEditModels: false
  })

  bimViewer.setConfigs({})
}
</script>