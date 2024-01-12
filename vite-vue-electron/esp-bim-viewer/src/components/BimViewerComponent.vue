<template>
<!-- <input type="checkbox" id="explorer_toggle"/>
<label for="explorer_toggle" class="xeokit-i18n explorer_toggle_label xeokit-btn fas fa-2x fa-sitemap" data-xeokit-i18ntip="toolbar.toggleExplorer" data-tippy-content="Toggle explorer"></label>
<input type="checkbox" id="inspector_toggle"/>
<label id="inspector_toggle_label" for="inspector_toggle" class="xeokit-i18n inspector_toggle_label xeokit-btn fas fa-info-circle fa-2x" data-xeokit-i18ntip="toolbar.toggleProperties" data-tippy-content="Toggle properties"></label> -->
<div id="myExplorer" class=""></div>
<div id="myToolbar"></div>
<div id="myInspector"></div>
<div id="myViewer" class="absolute h-screen w-screen bg-current">
    <canvas id="myCanvas"></canvas>
    <canvas id="myNavCubeCanvas"></canvas>
</div>
</template>
<script setup>
import { onMounted } from 'vue' /* @vite-ignore */
/* import { Server, BIMViewer, LocaleService } from ''
import { messages as localeMessages } from ''


onMounted(()=> launchViewer())

function launchViewer() {
    const projectId = 'Duplex'

    if(!projectId) {
        console.log('The projectId is not defined')
    }

    const openExplorer = true
    setExplorerOpen(openExplorer)

    const server = new Server({
        datadir: window.preloaderInterfaces.normalizedRootDirectory() + 'data/'
    })

    const bimViewer = new BIMViewer(server, {
        localeService: new LocaleService({
            messages: localeMessages,
            locale: 'en'
        }),
        canvasElement: document.getElementById('myCanvas'),
        keyboardEventsElement: document.getElementById('myCanvas'),
        explorerElement: document.getElementById('myExplorer'),
        toolBarElement: document.getElementById('myToolBar'),
        inspectorElement: document.getElementById('myInspector'),
        navCubeCanvasElement: document.getElementById('mynavCubeCanvas'),
        busyModelBackDropElement: document.getElementById('myViewer'),
        enableEditModels: false
    })

    bimViewer.setConfigs({})

    bimViewer.on('openExplorer', () => { 
        setExplorerOpen(true)
    })

    bimViewer.on('openInspector', () => {
        setInspectorOpen(true)
    })


    function setExplorerOpen(explorerOpen) {
        const toggle = document.getElementById('explorer_toggle')
        if (toggle) {
            toggle.checked = explorerOpen
        }
    }

    function setInspectorOpen(InspectorOpen) {
        const toggle = document.getElementById('inspector_toggle')
        if (toggle) {
            toggle.checked = InspectorOpen
        }
    }
 */
  /*   bimViewer.loadProject(projectId, () => {
                const modelId = requestParams.modelId;
                if (modelId) {
                    bimViewer.loadModel(modelId);
                }
                const tab = requestParams.tab;
                if (tab) {
                    bimViewer.openTab(tab);
                }
                watchHashParams();
            },
            (errorMsg) => {
                console.error(errorMsg);
            });
 */



/* }
 */

</script>