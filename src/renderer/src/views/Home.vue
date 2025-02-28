<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const animeList = ref({})
const mangaList = ref({})

const searchObjects = async (): Promise<void> => {
  const anime = await window.electron.ipcRenderer.invoke('getAnimeObjects', query.value)
  animeList.value = anime
  const manga = await window.electron.ipcRenderer.invoke('getMangaObjects', query.value)
  mangaList.value = manga
}
</script>

<template>
  <div class="search grid grid-cols-4 gap-4 max-w-4xl mx-auto">
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      class="query col-span-3 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="button"
      value="Search"
      class="col-span-1 rounded-lg border ring-black-500 text-2xl font-bold underline"
      @click="searchObjects"
    />
  </div>
  <div class="objects m-4">
    <p class="text-2xl text-center">Anime</p>
    <div class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 max-w-4xl mx-auto">
      <div
        v-for="anime in animeList.data"
        :key="anime.id"
        class="anime-item bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96"
      >
        <img :src="anime.cover.default" :alt="anime.rus_name" class="w-full h-48 object-cover" />
        <div class="content p-4 flex flex-col justify-between flex-grow">
          <h2 class="text-xl text-gray-800 mb-2">{{ anime.rus_name }}</h2>
          <p class="text-gray-500 text-sm">{{ anime.type.label }}</p>
          <div class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300">
            <router-link
              :to="{
                name: 'Object',
                params: {
                  slug_url: anime.slug_url,
                  model: anime.model
                }
              }"
              class="text-blue-600 font-semibold text-sm"
              >Подробнее</router-link
            >
            <a href="#" class="text-blue-600 font-semibold text-sm">Скачать</a>
          </div>
        </div>
      </div>
    </div>
    <p class="text-2xl text-center">Manga</p>
    <div class="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 mt-8 max-w-4xl mx-auto">
      <div
        v-for="manga in mangaList.data"
        :key="manga.id"
        class="manga-item bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96"
      >
        <img
          :src="manga.cover.default"
          :alt="manga.rus_name"
          class="w-full h-48 object-cover"
          :class="{ blur: manga.site === 2 || manga.site === 4 }"
        />
        <div class="content p-4 flex flex-col justify-between flex-grow">
          <h2 class="text-xl text-gray-800 mb-2">{{ manga.rus_name }}</h2>
          <p class="text-gray-500 text-sm">{{ manga.type.label }}</p>
          <div class="actions flex justify-between p-2 bg-gray-100 border-t border-gray-300">
            <router-link
              :to="{
                name: 'Object',
                params: {
                  slug_url: manga.slug_url,
                  model: manga.model
                }
              }"
              class="text-blue-600 font-semibold text-sm"
              >Подробнее</router-link
            >
            <a href="#" class="text-blue-600 font-semibold text-sm">Скачать</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
