<script setup lang="ts">
import { useThemeStore } from "../stores/theme";
import { useInstancesStore } from "../stores/instances";
import { useSettingsStore } from "../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

import { ref } from "vue";
import SearchInput from "../components/form/SearchInput.vue";
import SearchObjectsListGrid from "../components/form/SearchObjectsListGrid.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const searchObjectsListGridRef = ref<InstanceType<
  typeof SearchObjectsListGrid
> | null>(null);

const processObjects = async (queryNew: string): Promise<void> => {
  searchObjectsListGridRef.value?.searchObjects(queryNew);
};
</script>

<template>
  <SearchInput @process-objects="processObjects" />
  <SearchObjectsListGrid ref="searchObjectsListGridRef" />
</template>
