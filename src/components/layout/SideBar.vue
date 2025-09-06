<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";
import { useInstancesStore } from "../../stores/instances";
import { useSettingsStore } from "../../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

import { RouterLink } from "vue-router";
import { HomeIcon, SettingsIcon, UserIcon, XIcon } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/40"
      @click.self="emit('close')"
    >
      <aside
        class="w-64 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl p-4 absolute left-0 top-0 z-50"
      >
        <!-- Закрыть -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Menu</h2>
          <button
            @click="emit('close')"
            class="text-gray-500 hover:text-red-500"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Навигация -->
        <nav class="flex flex-col gap-4">
          <RouterLink
            @click="emit('close')"
            to="/"
            class="flex items-center gap-3 hover:text-blue-500"
          >
            <HomeIcon class="w-5 h-5" />
            <span>Home</span>
          </RouterLink>
          <RouterLink
            @click="emit('close')"
            to="/preferences"
            class="flex items-center gap-3 hover:text-blue-500"
          >
            <SettingsIcon class="w-5 h-5" />
            <span>Preferences</span>
          </RouterLink>
          <RouterLink
            @click="emit('close')"
            to="/user/me"
            class="flex items-center gap-3 hover:text-blue-500"
          >
            <UserIcon class="w-5 h-5" />
            <span>Profile</span>
          </RouterLink>
        </nav>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
