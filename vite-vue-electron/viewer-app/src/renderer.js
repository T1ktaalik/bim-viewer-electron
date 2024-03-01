/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

/* import './index.css'; */

import { BIMViewer, LocaleService } from './xkt-bim-viewer/index.js'
import { messages as localeMessages } from  './xkt-bim-viewer/sources/messages.js'
import { Server } from './xkt-bim-viewer/sources/server/ServerModified.js'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


console.log(import.meta.env.VITE_API_MODE)

/* window.onload = */ function startViewer () {
  const project= 'sklad-naberejnaya';

  const requestParams = getRequestParams(project);

  const locale = requestParams.locale || "en";

  const projectId = requestParams.projectId;
  
  if (!projectId) {
  console.log('There is a projectId issue. pojectId is not defined')
  return;
  }
  
  //const openExplorer = requestParams.openExplorer;
  const openExplorer = true
  //setExplorerOpen(openExplorer === "true");
  setExplorerOpen(openExplorer);
  
  const enableEditModels = (requestParams.enableEditModels === "true");
  const server = new Server({
   dataDir: window.preloaderAPI.rootDirectory()
  });

  const bimViewer = new BIMViewer(server, {
  localeService: new LocaleService({
      messages: localeMessages,
      locale: locale
  }),
  canvasElement: document.getElementById("myCanvas"), // WebGL canvas
  keyboardEventsElement: document, // Optional, defaults to document
  explorerElement: document.getElementById("myExplorer"), // Left panel
  toolbarElement: document.getElementById("myToolbar"), // Toolbar
  inspectorElement: document.getElementById("myInspector"), // Right panel
  navCubeCanvasElement: document.getElementById("myNavCubeCanvas"),
  busyModelBackdropElement: document.getElementById("myViewer"),
  enableEditModels: enableEditModels
  });
  
  bimViewer.localeService.on("updated", () => {
  const localizedElements = document.querySelectorAll('.xeokit-i18n');
  localizedElements.forEach((localizedElement) => {
      if (localizedElement.dataset.xeokitI18n) {
          localizedElement.innerText = bimViewer.localeService.translate(localizedElement.dataset.xeokitI18n);
      }
      if (localizedElement.dataset.xeokitI18ntip) {
          const translation = bimViewer.localeService.translate(localizedElement.dataset.xeokitI18ntip);
          if (translation) {
              localizedElement.dataset.tippyContent = bimViewer.localeService.translate(localizedElement.dataset.xeokitI18ntip);
          }
      }
      if (localizedElement.dataset.tippyContent) {
          if (localizedElement._tippy) {
              localizedElement._tippy.setContent(localizedElement.dataset.tippyContent);
          } else {
              tippy(localizedElement, {
                  appendTo: "parent",
                  zIndex: 1000000,
                  allowHTML: true
              });
          }
      }
  });
  });
  
  bimViewer.setConfigs({
  "showSpaces": false, // Default
  "selectedGlowThrough": true,
  "highlightGlowThrough": true,
  "dtxEnabled": true // Enable data texture scene representation for models - may be slow on low-spec GPUs
  });
  
  bimViewer.on("openExplorer", () => {
  setExplorerOpen(true);
  });
  
  bimViewer.on("openInspector", () => {
  setInspectorOpen(true);

  });


  
/*   bimViewer.on("addModel", (event) => { // "Add" selected in Models tab's context menu
  console.log("addModel: " + JSON.stringify(event, null, "\t"));
  });
  
  bimViewer.on("editModel", (event) => { // "Edit" selected in Models tab's context menu
  console.log("editModel: " + JSON.stringify(event, null, "\t"));
  });
  
  bimViewer.on("deleteModel", (event) => { // "Delete" selected in Models tab's context menu
  console.log("deleteModel: " + JSON.stringify(event, null, "\t"));
  }); */
  
  const viewerConfigs = requestParams.configs;
  if (viewerConfigs) {
  const configNameVals = viewerConfigs.split(",");
  for (let i = 0, len = configNameVals.length; i < len; i++) {
      const configNameValStr = configNameVals[i];
      const configNameVal = configNameValStr.split(":");
      const configName = configNameVal[0];
      const configVal = configNameVal[1];
      bimViewer.setConfig(configName, configVal);
  }
  }

  bimViewer.loadProject(projectId, () => {

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
  
  const saveBCFButton = document.getElementById('saveBCFButton');
  let viewPoint
  saveBCFButton.addEventListener('click', function() {
    viewPoint = bimViewer.saveBCFViewpoint();
    console.log(typeof viewPoint)
    console.log(viewPoint)
    console.log(bimViewer.saveBCFViewpoint())})

  const loadBCFButton =document.getElementById('loadBCFButton');
  loadBCFButton.addEventListener('click', function() {
     console.log('loading BCF!')
    bimViewer.loadBCFViewpoint(viewPoint)
    
    })

  function watchHashParams() {
  let lastHash = "";
  window.setInterval(() => {
      const currentHash = window.location.hash;
      if (currentHash !== lastHash) {
          parseHashParams();
          lastHash = currentHash;
      }
  }, 400);
  }
  
  function parseHashParams() {
  const params = getHashParams();
  const actionsStr = params.actions;
  if (!actionsStr) {
      return;
  }
  const actions = actionsStr.split(",");
  if (actions.length === 0) {
      return;
  }
  for (let i = 0, len = actions.length; i < len; i++) {
      const action = actions[i];
      switch (action) {
          case "focusObject":
              const objectId = params.objectId;
              if (!objectId) {
                  console.error("Param expected for `focusObject` action: 'objectId'");
                  break;
              }
              bimViewer.setAllObjectsSelected(false);
              bimViewer.setObjectsSelected([objectId], true);
              bimViewer.flyToObject(objectId, () => {
                  // FIXME: Showing objects in tabs involves scrolling the HTML within the tabs - disable until we know how to scroll the correct DOM element. Otherwise, that function works OK
  
                  // bimViewer.showObjectInObjectsTab(objectId);
                  // bimViewer.showObjectInClassesTab(objectId);
                  // bimViewer.showObjectInStoreysTab(objectId);
              });
              break;
          case "focusObjects":
              const objectIds = params.objectIds;
              if (!objectIds) {
                  console.error("Param expected for `focusObjects` action: 'objectIds'");
                  break;
              }
              const objectIdArray = objectIds.split(",");
              bimViewer.setAllObjectsSelected(false);
              bimViewer.setObjectsSelected(objectIdArray, true);
              bimViewer.viewFitObjects(objectIdArray, () => {
              });
              break;
          case "clearFocusObjects":
              bimViewer.setAllObjectsSelected(false);
              bimViewer.viewFitAll();
              // TODO: view fit nothing?
              break;
          case "openTab":
              const tabId = params.tabId;
              if (!tabId) {
                  console.error("Param expected for `openTab` action: 'tabId'");
                  break;
              }
              bimViewer.openTab(tabId);
              break;
          default:
              console.error("Action not supported: '" + action + "'");
              break;
      }
  }
  }
  
  function setExplorerOpen(explorerOpen) {
  const toggle = document.getElementById("explorer_toggle");
  if (toggle) {
      toggle.checked = explorerOpen;
  }
  }
  
  function setInspectorOpen(inspectorOpen) {
  const toggle = document.getElementById("inspector_toggle");
  if (toggle) {
      toggle.checked = inspectorOpen;
  }
  }
  
  function getRequestParams(projectId) {
    const vars = {};
    vars.projectId = projectId
/*   window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
  }); */
  return vars;
  }
  
  function getHashParams() {
  const hashParams = {};
  let e;
  const a = /\+/g;  // Regex for replacing addition symbol with a space
  const r = /([^&;=]+)=?([^&;]*)/g;
  const d = function (s) {
      return decodeURIComponent(s.replace(a, " "));
  };
  const q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
      hashParams[d(e[1])] = d(e[2]);
  }
  return hashParams;
  }
  
  window.bimViewer = bimViewer;
  }

  startViewer()