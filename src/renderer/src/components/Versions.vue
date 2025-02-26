<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive({ ...window.electron.process.versions })
</script>

<template>
  <ul class="versions">
    <li class="electron-version text-1xl font-bold">Electron v{{ versions.electron }}</li>
    <li class="chrome-version text-1xl font-bold">Chromium v{{ versions.chrome }}</li>
    <li class="node-version text-1xl font-bold">Node v{{ versions.node }}</li>
  </ul>
</template>
