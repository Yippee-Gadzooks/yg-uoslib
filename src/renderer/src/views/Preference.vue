<script setup lang="ts">
import { useThemeStore } from '../stores/theme'
import { ref } from 'vue'
import SettingsCollapsible from '../components/Preference/SettingsCollapsible.vue'

const themeStore = useThemeStore()
const downloaderType = ref<'off' | 'auto'>('off')
const layout = ref<'idk' | 'yes'>('idk')
</script>

<template>
  <div class="w-3/5 mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl">
    <h1 class="text-2xl font-semibold text-center text-gray-900 dark:text-white">Settings</h1>
    <p class="text-sm text-center text-gray-600 dark:text-gray-400">
      Customize your preferences below
    </p>

    <div class="mt-4 space-y-4">
      <SettingsCollapsible title="Design" description="">
        <!-- Dark Mode Toggle -->
        <div class="flex justify-between items-center">
          <span class="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="themeStore.theme"
              type="checkbox"
              true-value="dark"
              false-value="light"
              class="hidden"
            />
            <div class="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative">
              <div
                class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-300"
                :class="{ 'translate-x-5': themeStore.theme === 'dark' }"
              ></div>
            </div>
          </label>
        </div>
      </SettingsCollapsible>
      <SettingsCollapsible title="Downloader" description="">
        <!-- Downloader Option -->
        <div class="flex justify-between items-center">
          <span class="text-gray-700 dark:text-gray-300">Download:</span>
          <select
            v-model="downloaderType"
            class="w-3/5 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-center"
          >
            <option value="off">Off</option>
            <option value="auto">Automatic</option>
          </select>
        </div>
      </SettingsCollapsible>
      <!-- Test Option -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Layout</label>
        <select
          v-model="layout"
          class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option value="idk">Not Sure</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </div>
  </div>
</template>
