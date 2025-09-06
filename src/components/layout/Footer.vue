<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";
import { useInstancesStore } from "../../stores/instances";
import { useSettingsStore } from "../../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

// Можно добавить логику, если нужно, сейчас просто статичный футер
</script>

<template>
  <footer
    class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 mt-auto shadow-inner"
  >
    <div
      class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center"
    >
      <p class="text-sm">&copy; 2025 Yippe Gadzooks. Made for personal use.</p>
      <nav class="flex gap-4 mt-2 md:mt-0">
        <a href="/" class="hover:text-blue-500">Главная</a>
        <a
          href="https://github.com/Yippee-Gadzooks/yg-uoslib"
          class="hover:text-blue-500"
          >Github</a
        >
        <a href="/404" class="hover:text-blue-500">Docker</a>
      </nav>
    </div>
  </footer>
</template>
