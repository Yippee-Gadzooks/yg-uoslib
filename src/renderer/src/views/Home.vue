<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'
import SearchInput from '../components/Home/SearchInput.vue'
import SearchObjectsListGrid from '../components/Home/SearchObjectsListGrid.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()
const searchObjectsListGridRef = ref<InstanceType<typeof SearchObjectsListGrid> | null>(null)

const processObjects = async (queryNew: string): Promise<void> => {
  searchObjectsListGridRef.value?.searchObjects(queryNew)
}
</script>

<template>
  <SearchInput @process-objects="processObjects" />
  <SearchObjectsListGrid ref="searchObjectsListGridRef" />
</template>
