<script setup lang="ts">
import { useThemeStore } from './stores/theme'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

import TopNav from './components/TopNav.vue'
</script>
<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    <TopNav />
    <main>
      <RouterView />
    </main>
  </div>
</template>
