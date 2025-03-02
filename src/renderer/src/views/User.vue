<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useThemeStore } from '../stores/theme'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const data = ref(JSON.parse('{}'))

const route = useRoute()
const params = route.params

const fetchData = async (): Promise<void> => {
  const data_invoke = await window.electron.ipcRenderer.invoke('getUser', undefined, params.userId)
  console.log(data_invoke)
  data.value = data_invoke.data
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="data && data.id">
    <p>{{ data }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
