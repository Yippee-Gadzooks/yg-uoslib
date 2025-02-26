<script setup lang="ts">
import Versions from '../components/Versions.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <input
    type="text"
    placeholder="Search..."
    class="w-4/5 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-24"
  />

  <div class="action">
    <button
      class="rounded-lg border ring-black-500 text-2xl font-bold underline"
      @click="ipcHandle"
    >
      Send IPC
    </button>
  </div>
  <Versions />
</template>
