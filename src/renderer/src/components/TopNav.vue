<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import { RouterLink } from 'vue-router'
import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-vue-next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()
const userId = ref<string | null>(null)

onMounted(() => {
  userId.value = window.env?.USER_ID || 'No user ID found'
})
</script>

<template>
  <nav class="bg-gray-100 dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center mb-4">
    <div class="flex items-center gap-4">
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-gray-900 dark:text-white hover:text-blue-500"
      >
        <HomeIcon class="w-5 h-5" />
        <span>Home</span>
      </RouterLink>
      <RouterLink
        to="/preferences"
        class="flex items-center gap-2 text-gray-900 dark:text-white hover:text-blue-500"
      >
        <SettingsIcon class="w-5 h-5" />
        <span>Preferences</span>
      </RouterLink>
    </div>
    <div class="flex items-center gap-2 text-gray-900 dark:text-white">
      <UserIcon class="w-5 h-5" />
      <RouterLink :to="`/user/${userId}`" class="hover:text-blue-500">{{ userId }}</RouterLink>
    </div>
  </nav>
</template>
