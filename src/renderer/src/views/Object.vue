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
  const data_invoke = await window.electron.ipcRenderer.invoke(
    'getObject',
    undefined,
    params.model,
    params.slug_url
  )
  console.log(data_invoke)
  data.value = data_invoke.data
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="data && data.rus_name">
    <h1>{{ data.rus_name }}</h1>
    <p>Site Id:{{ data.site }}</p>
    <p>Age:{{ data.ageRestriction.label }}</p>
    <p>Type:{{ data.type.label }}</p>
    <p>{{ data.summary }}</p>
    <p>Date of release:{{ data.releaseDate }}</p>
    <p>Views: {{ data.views.short }}</p>
    <p>Rating: {{ data.rating.averageFormated }} ({{ data.rating.voteFormated }})</p>
    <p>Licensed: {{ data.is_licensed }}</p>
    <p>Teams: {{ data.teams }}</p>
    <p>Genres: {{ data.genres }}</p>
    <p>Tags: {{ data.tags }}</p>
    <p>Publisher: {{ data.publisher }}</p>
    <p>Authors: {{ data.authors }}</p>
    <p>Model: {{ data.model }}</p>
    <p>Status: {{ data.status.label }}</p>
    <p>Time: {{ data.time.formated }}</p>
    <p>Items: {{ data.items_count }}</p>
    <p>Episodes schedule: {{ data.episodes_schedule }}</p>
    <p>Release date: {{ data.releaseDateString }}</p>
    <p>Shikimori url: {{ data.shikimori_href }}</p>
    <p>Shikimori rate: {{ data.shiki_rate }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
