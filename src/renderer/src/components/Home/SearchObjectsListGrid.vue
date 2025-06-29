<script setup lang="ts">
import { Loader } from 'lucide-vue-next'
import { ref, defineExpose } from 'vue'

interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
}

const query = ref('')
const isFetching = ref(0)
const animeList = ref<ApiResponse>({ data: [] })
const mangaList = ref<ApiResponse>({ data: [] })

const searchObjects = async (searchQuery: string = query.value): Promise<void> => {
  isFetching.value = 1
  try {
    query.value = searchQuery

    const [anime, manga] = await Promise.all([
      window.electron.ipcRenderer.invoke('searchAnimeObjects', searchQuery),
      window.electron.ipcRenderer.invoke('searchMangaObjects', searchQuery)
    ])

    animeList.value = anime
    mangaList.value = manga
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
  isFetching.value = 0
}

defineExpose({ searchObjects })
</script>

<template>
  <div
    v-if="animeList.data.length < 1 && mangaList.data.length < 1 && isFetching == 1"
    class="flex justify-center items-center min-h-screen"
  >
    <Loader class="text-blue-500 w-12 h-12 animate-spin" />
  </div>

  <div v-if="animeList.data.length > 0">
    <div class="objects m-4">
      <p class="text-2xl text-center dark:text-white">Anime</p>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 max-w-4xl mx-auto">
        <div
          v-for="anime in animeList.data"
          :key="anime.id"
          class="anime-item bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96 dark:bg-gray-800 dark:text-white"
        >
          <img :src="anime.cover.default" :alt="anime.rus_name" class="w-full h-48 object-cover" />
          <div class="content p-4 flex flex-col justify-between flex-grow">
            <h2 class="text-xl text-gray-800 mb-2 dark:text-gray-300">{{ anime.rus_name }}</h2>
            <p class="text-gray-500 text-sm dark:text-gray-400">{{ anime.type.label }}</p>
            <div
              class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              <router-link
                :to="{
                  name: 'Object',
                  params: {
                    model: anime.model,
                    slug_url: anime.slug_url
                  }
                }"
                class="text-blue-600 font-semibold text-sm dark:text-blue-400"
                >Подробнее</router-link
              >
              <a href="#" class="text-blue-600 font-semibold text-sm dark:text-blue-400">Скачать</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="mangaList.data.length > 0">
    <p class="text-2xl text-center dark:text-white">Manga</p>
    <div class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 mt-8 max-w-4xl mx-auto">
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
          <h2 class="text-xl text-gray-800 mb-2 dark:text-gray-300">{{ manga.rus_name }}</h2>
          <p class="text-gray-500 text-sm dark:text-gray-400">{{ manga.type.label }}</p>
          <div
            class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <router-link
              :to="{
                name: 'Object',
                params: {
                  model: manga.model,
                  slug_url: manga.slug_url
                }
              }"
              class="text-blue-600 font-semibold text-sm dark:text-blue-400"
              >Подробнее</router-link
            >
            <a href="#" class="text-blue-600 font-semibold text-sm dark:text-blue-400">Скачать</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
