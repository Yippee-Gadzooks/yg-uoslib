<script setup lang="ts">
import { useThemeStore } from "../stores/theme";
import { useInstancesStore } from "../stores/instances";
import { useSettingsStore } from "../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const data = ref(JSON.parse("{}"));
const route = useRoute();

const fetchData = async (): Promise<void> => {
  const response = await window.electron.ipcRenderer.invoke(
    "getUser",
    undefined,
    route.params.userId,
  );
  data.value = response?.data || {};
};

onMounted(fetchData);

const formatDate = (dateString: string): string => {
  if (!dateString) return "Неизвестно";
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const levelProgress = computed(() => {
  return `${data.value?.points_info?.point_percent_progress || 0}%`;
});
</script>

<template>
  <div v-if="data?.id">
    <div
      class="border border-gray-500 border-dashed p-4 rounded-md w-4/5 mx-auto text-center bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      <div class="relative">
        <img
          :src="
            data.background?.url ||
            '/static/images/placeholders/background.jpeg'
          "
          alt="Background"
          class="w-full h-32 object-cover rounded-md"
        />
        <img
          :src="
            data.avatar?.url || '/static/images/placeholders/user_avatar.png'
          "
          alt="Avatar"
          class="w-20 h-20 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-8"
        />
      </div>
      <div class="mt-10">
        <p class="text-lg font-semibold">{{ data.username }}</p>
        <p class="text-gray-600 dark:text-gray-200">🆔 ID: {{ data.id }}</p>
        <p class="text-gray-600 dark:text-gray-200">
          📅 Дата регистрации: {{ formatDate(data.created_at) }}
        </p>
        <p class="text-gray-600 dark:text-gray-200">
          🕒 Был онлайн: {{ formatDate(data.last_online_at) }}
        </p>
        <p class="text-gray-600 dark:text-gray-200">
          🧑 Пол: {{ data.gender?.label || "Не указан" }}
        </p>
        <p v-if="data.premium?.enabled" class="text-yellow-500 font-semibold">
          ⭐ Premium
        </p>
        <p v-else class="text-gray-500 dark:text-gray-200">
          🚫 Обычный аккаунт
        </p>

        <div class="mt-3">
          <p class="font-semibold">
            🏆 Уровень: {{ data.points_info?.level || 0 }}
          </p>
          <div
            class="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5 mt-1"
          >
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              :style="{ width: levelProgress }"
            ></div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            {{ data.points_info?.current_level_points || 0 }} /
            {{ data.points_info?.max_level_points || 0 }} до след. уровня
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
