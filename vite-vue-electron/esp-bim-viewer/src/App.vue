<template>
   <div>
      <q-toolbar class="text-primary">
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        Toolbar
      </q-toolbar-title>
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
    <BimViewerComponent class="h-full bg-slate-100	" />
   </div>
 
</template>
<script setup>

import  BimViewerComponent  from './components/BimViewerComponent.vue';
</script>