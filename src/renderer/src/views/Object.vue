<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useThemeStore } from '../stores/theme'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const data = ref(JSON.parse('{}'))

const route = useRoute()
const params = route.params
onMounted(async () => {
  const data_invoke = await window.electron.ipcRenderer.invoke(
    'getObject',
    undefined,
    params.model,
    params.slug_url
  )
  console.log(data_invoke)
  data.value = data_invoke.data
})
</script>

<template>
  <p>{{ data }}</p>
</template>
