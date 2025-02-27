<script setup lang="ts">
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
<div class="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
  <input
    type="text"
    placeholder="Search..."
    class="col-span-3 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="button"
    value="Search"
    class="col-span-1 rounded-lg border ring-black-500 text-2xl font-bold underline"
    @click="ipcHandle"
  />
</div>
</template>
