<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const query = ref('')
const animeList = ref(JSON.parse('{}'))
const mangaList = ref(JSON.parse('{}'))

const searchObjects = async (): Promise<void> => {
  const anime = await window.electron.ipcRenderer.invoke(
    'searchAnimeObjects',
    query.value,
    undefined
  )
  animeList.value = anime
  const manga = await window.electron.ipcRenderer.invoke(
    'searchMangaObjects',
    query.value,
    undefined,
    undefined
  )
  mangaList.value = manga
}
</script>

<template>
  <div class="search grid grid-cols-4 gap-4 max-w-4xl mx-auto">
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      class="query col-span-3 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    />
    <input
      type="button"
      value="Search"
      class="col-span-1 rounded-lg border ring-black-500 text-2xl font-bold underline dark:bg-gray-700 dark:border-gray-500 dark:text-white"
      @click="searchObjects"
    />
  </div>
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
