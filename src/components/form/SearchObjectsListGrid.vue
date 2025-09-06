<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";
import { useInstancesStore } from "../../stores/instances";
import { useSettingsStore } from "../../stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

import { Loader } from "lucide-vue-next";
import { ref, defineExpose } from "vue";
import { invoke } from "@tauri-apps/api/core";

interface ApiResponse {
  data: any[];
}

const query = ref("");
const isFetching = ref(false);
const animeList = ref<ApiResponse>({ data: [] });
const mangaList = ref<ApiResponse>({ data: [] });

const searchObjects = async (
  searchQuery: string = query.value,
): Promise<void> => {
  isFetching.value = true;
  try {
    query.value = searchQuery;

    const [animeResponseRaw, mangaResponseRaw] = await Promise.all([
      invoke("search_anime_objects", { query: searchQuery }) as Promise<string>,
      invoke("search_manga_objects", {
        query: searchQuery,
        site_ids: undefined,
      }) as Promise<string>,
    ]);

    const animeResponse = JSON.parse(animeResponseRaw);
    const mangaResponse = JSON.parse(mangaResponseRaw);

    animeList.value = {
      data: Array.isArray(animeResponse.data) ? animeResponse.data : [],
    };
    mangaList.value = {
      data: Array.isArray(mangaResponse.data) ? mangaResponse.data : [],
    };
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    animeList.value = { data: [] };
    mangaList.value = { data: [] };
  } finally {
    isFetching.value = false;
  }
};

defineExpose({ searchObjects });
</script>

<template>
  <div
    v-if="
      animeList.data.length < 1 &&
      mangaList.data.length < 1 &&
      isFetching == true
    "
    class="flex justify-center items-center min-h-screen"
  >
    <Loader class="text-blue-500 w-12 h-12 animate-spin" />
  </div>

  <div v-if="animeList.data.length > 0">
    <div class="objects m-4">
      <p class="text-2xl text-center dark:text-white">Anime</p>
      <div
        class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 max-w-4xl mx-auto"
      >
        <div
          v-for="anime in animeList.data"
          :key="anime.id"
          class="anime-item bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96 dark:bg-gray-800 dark:text-white"
        >
          <img
            :src="anime.cover.default"
            :alt="anime.rus_name"
            class="w-full h-48 object-cover"
          />
          <div class="content p-4 flex flex-col justify-between flex-grow">
            <h2 class="text-xl text-gray-800 mb-2 dark:text-gray-300">
              {{ anime.rus_name }}
            </h2>
            <p class="text-gray-500 text-sm dark:text-gray-400">
              {{ anime.type.label }}
            </p>
            <div
              class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              <router-link
                :to="{
                  name: 'Object',
                  params: {
                    model: anime.model,
                    slug_url: anime.slug_url,
                  },
                }"
                class="text-blue-600 font-semibold text-sm dark:text-blue-400"
                >Подробнее</router-link
              >
              <a
                href="#"
                class="text-blue-600 font-semibold text-sm dark:text-blue-400"
                >Скачать</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="mangaList.data.length > 0">
    <p class="text-2xl text-center dark:text-white">Manga</p>
    <div
      class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 mt-8 max-w-4xl mx-auto"
    >
      <div
        v-for="manga in mangaList.data"
        :key="manga.id"
        class="manga-item bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96 dark:bg-gray-800 dark:text-white"
      >
        <img
          :src="manga.cover.default"
          :alt="manga.rus_name"
          class="w-full h-48 object-cover"
          :class="{ blur: manga.site === 2 || manga.site === 4 }"
        />
        <div class="content p-4 flex flex-col justify-between flex-grow">
          <h2 class="text-xl text-gray-800 mb-2 dark:text-gray-300">
            {{ manga.rus_name }}
          </h2>
          <p class="text-gray-500 text-sm dark:text-gray-400">
            {{ manga.type.label }}
          </p>
          <div
            class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <router-link
              :to="{
                name: 'Object',
                params: {
                  model: manga.model,
                  slug_url: manga.slug_url,
                },
              }"
              class="text-blue-600 font-semibold text-sm dark:text-blue-400"
              >Подробнее</router-link
            >
            <a
              href="#"
              class="text-blue-600 font-semibold text-sm dark:text-blue-400"
              >Скачать</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
