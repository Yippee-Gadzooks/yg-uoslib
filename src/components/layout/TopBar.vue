<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";
import { useInstancesStore } from "../../stores/instances";
import { useSettingsStore } from "../../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  HomeIcon,
  SettingsIcon,
  Folder,
  MenuIcon,
  Cloud,
  Server,
  Plus,
  FolderX,
} from "lucide-vue-next";
import Sidebar from "./SideBar.vue";
import Instance from "../form/Instance.vue";

const isThemeLoaded = ref(false);

const instanceMenu = ref(false);
const instanceManage = ref(false);

const isSidebarOpen = ref(false);

onMounted(async () => {
  await themeStore.loadTheme();
  isThemeLoaded.value = true;
});

const themeToggle = computed({
  get: () => themeStore.theme === "dark",
  set: (val: boolean) => themeStore.setTheme(val ? "dark" : "light"),
});

import { invoke } from "@tauri-apps/api/core";
const setActiveInstanceToRust = async () => {
  const active = instancesStore.getActiveInstance();
  if (active) {
    await invoke("set_active_instance", { instance: JSON.stringify(active) });
  }
};
</script>
<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center"
  >
    <!-- Левая часть -->
    <div class="flex items-center gap-4">
      <!-- Гамбургер -->
      <button
        @click="isSidebarOpen = true"
        class="text-gray-900 dark:text-white hover:text-blue-500"
      >
        <MenuIcon class="w-6 h-6" />
      </button>
      <!-- Ссылки -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 hover:text-blue-500 text-gray-900 dark:text-white"
      >
        <HomeIcon class="w-5 h-5" />
        <span>Home</span>
      </RouterLink>
      <RouterLink
        to="/preferences"
        class="flex items-center gap-2 hover:text-blue-500 text-gray-900 dark:text-white"
      >
        <SettingsIcon class="w-5 h-5" />
        <span>Preferences</span>
      </RouterLink>
    </div>
    <!-- Правая часть -->
    <div class="flex items-center gap-4 text-gray-900 dark:text-white">
      <!-- Темная тема -->
      <div v-if="isThemeLoaded" class="flex items-center gap-2">
        <label class="relative inline-flex items-center cursor-pointer">
          <input v-model="themeToggle" type="checkbox" class="hidden" />
          <div
            class="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative"
          >
            <div
              class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-300"
              :class="{ 'translate-x-5': themeStore.theme === 'dark' }"
            ></div>
          </div>
        </label>
      </div>
      <!-- Инстанс -->
      <div class="flex items-center gap-2">
        <div v-if="instancesStore.getActiveInstance()?.type === 'folder'">
          <Folder class="mr-2" />
        </div>
        <div v-else-if="instancesStore.getActiveInstance()?.type === 'server'">
          <Server class="mr-2" />
        </div>
        <div v-else><FolderX class="mr-2" /></div>
        <button
          @click="instanceMenu = !instanceMenu"
          class="hover:text-blue-500"
        >
          {{
            instancesStore.getActiveInstance()?.name || "No instance connected"
          }}
        </button>
      </div>
      <div
        v-if="instanceMenu"
        class="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-md text-sm text-gray-700 z-40 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
      >
        <ul>
          <li
            class="flex items-center px-3 py-2 cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-600 dark:hover:text-blue-300 transition"
            v-for="instance in instancesStore.instances"
            :key="instance.id"
            @click="
              instancesStore.setActiveInstance(instance.id);
              setActiveInstanceToRust();
              instanceMenu = !instanceMenu;
            "
          >
            <div v-if="instance.type === 'folder'"><Folder class="mr-2" /></div>
            <div v-else><Server class="mr-2" /></div>
            {{ instance.name }}
          </li>

          <li
            @click="
              isSidebarOpen = false;
              instanceManage = true;
              instanceMenu = !instanceMenu;
            "
            class="flex items-center px-3 py-2 cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-600 dark:hover:text-blue-300 transition"
          >
            <Plus class="mr-2" /> Add new
          </li>
        </ul>
      </div>
    </div>
    <!-- Сайдбар -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    <!-- Instance Manage -->
    <Instance :isOpen="instanceManage" @close="instanceManage = false" />
  </nav>
</template>
