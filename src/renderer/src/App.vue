<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const userId = ref<string | null>(null)

onMounted(() => {
  userId.value = window.env?.USER_ID || 'No user ID found'
})
</script>
<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    <strong>Current route path: </strong>
    {{ $route.fullPath }}
    <br />
    <strong>Current user id: </strong>
    <RouterLink :to="`/user/${userId}`">{{ userId }}</RouterLink>
    <nav>
      <RouterLink to="/">Go to home</RouterLink>
      <br />
      <RouterLink to="/preferences">Go to preferences</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>
