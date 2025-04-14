<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useThemeStore } from '../stores/theme'
import { EyeIcon, StarIcon, FilePlus, Play, Loader } from 'lucide-vue-next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const data = ref(JSON.parse('{}'))
const relations = ref(JSON.parse('{}'))
const similars = ref(JSON.parse('{}'))

const route = useRoute()
const params = route.params

const fetchData = async (): Promise<void> => {
  const data_invoke = await window.electron.ipcRenderer.invoke(
    'getObject',
    undefined,
    params.model,
    params.slug_url
  )
  const relations_invoke = await window.electron.ipcRenderer.invoke(
    'getObjectRelations',
    params.model,
    params.slug_url
  )
  const similars_invoke = await window.electron.ipcRenderer.invoke(
    'getObjectSimilar',
    params.model,
    params.slug_url
  )
  //console.log(data_invoke)
  console.log(data_invoke)
  data.value = data_invoke.data
  relations.value = relations_invoke.data
  similars.value = similars_invoke.data
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="data && data.rus_name" class="anime-detail-container">
    <!-- Заголовок и навигация -->
    <header class="anime-header mb-8">
      <div class="platform-tabs flex gap-2 mb-4 justify-center">
        <button class="tab-btn active">О тайтле</button>
        <button class="tab-btn">Комментарии</button>
        <button class="tab-btn">Отзывы</button>
      </div>

      <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">
        {{ data.rus_name }}
        <span class="block mt-2 text-lg font-medium text-gray-600 dark:text-gray-400">
          {{ data.type.label }} • {{ data.status.label }} • {{ data.releaseDateString }}
        </span>
      </h1>

      <div class="meta-info flex justify-center gap-4 mt-4 flex-wrap">
        <div class="badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {{ data.ageRestriction.label }}
        </div>
        <div class="flex items-center gap-1 text-gray-600 dark:text-gray-300">
          <EyeIcon class="w-5 h-5" /> {{ data.views.short }}
        </div>
        <div class="flex items-center gap-1 text-yellow-600">
          <StarIcon class="w-5 h-5" /> {{ data.rating.averageFormated }}
        </div>
      </div>
    </header>
    <!-- Плашки приложения -->
    <div class="app-badges flex flex-wrap gap-4 mb-8 justify-center">
      <div
        class="app-card bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center gap-3"
      >
        <FilePlus class="w-6 h-6 text-green-500" />
        <span class="font-medium">Добавить в список</span>
      </div>
      <div
        class="app-card bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center gap-3"
      >
        <Play class="w-6 h-6 text-blue-500" />
        <span class="font-medium">В плеер</span>
      </div>
    </div>

    <!-- Основной контент -->
    <main class="anime-content max-w-6xl mx-auto px-4">
      <!-- Обложка и описание -->
      <section class="flex flex-col md:flex-row gap-8 mb-8">
        <img
          :src="data.cover.default"
          alt="Обложка аниме"
          class="anime-cover w-full md:w-1/3 rounded-xl shadow-lg"
        />

        <div class="description-box bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex-1">
          <!-- Блок статистики -->
          <div class="stats-grid grid grid-cols-2 gap-4 mb-4">
            <div class="stat-item bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-300">📦 На сайте</p>
              <p v-if="data.site == 5" class="font-bold">
                {{ data.items_count.uploaded }} / {{ data.items_count.total }}
              </p>
              <p v-else class="font-bold">
                {{ data.items_count.uploaded }}
              </p>
            </div>
            <div v-if="data.time" class="stat-item bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-300">⌛ Время эпизода</p>
              <p class="font-bold">{{ data.time.formated }}</p>
            </div>
            <div v-else class="stat-item bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-300">📶 Английское название</p>
              <p class="font-bold">{{ data.eng_name }}</p>
            </div>
          </div>

          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ data.summary }}
          </p>
        </div>
      </section>

      <!-- Связанный контент -->
      <section v-if="relations" class="related-content mb-8">
        <h2 class="section-title mb-4">
          <span v-if="relations.length == 1">📌 Связанный тайтл</span
          ><span v-else>📌 Связанные тайтлы</span>
        </h2>
        <div class="cards-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="relation in relations" :key="relation" class="related-card">
            <img
              :src="relation.media.cover.default"
              class="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p class="text-sm font-medium truncate">{{ relation.media.rus_name }}</p>
          </div>
        </div>
      </section>

      <section v-if="similars" class="related-content mb-8">
        <h2 class="section-title mb-4">
          <span v-if="similars.length == 1">🖼 Похожий тайтл</span
          ><span v-else>🖼 Похожие тайтлы</span>
        </h2>
        <div class="cards-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="similar in similars" :key="similar" class="related-card">
            <img
              :src="similar.media.cover.default"
              class="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p class="text-sm font-medium truncate">{{ similar.media.rus_name }}</p>
          </div>
        </div>
      </section>

      <!-- Детальная информация -->
      <section class="info-grid grid md:grid-cols-2 gap-6 mb-8">
        <!-- Команды -->
        <div class="info-card">
          <h2 class="info-title">
            <span v-if="data.teams.length == 1">👥 Команда</span><span v-else>👥 Команды</span>
          </h2>
          <ul class="team-list grid md:grid-cols-2">
            <li v-for="team in data.teams" :key="team.id" class="team-item">
              <img :src="team.cover.thumbnail" :alt="team.name" class="team-logo" />
              <a :href="'/team/' + team.slug_url" class="team-link">{{ team.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Жанры и теги -->
        <div class="info-card">
          <div class="mb-6">
            <h2 class="info-title">
              <span v-if="data.genres.length == 1">🎭 Жанр</span><span v-else>🎭 Жанры</span>
            </h2>
            <p class="tags-list">{{ data.genres.map((g) => g.name).join(', ') }}</p>
          </div>
          <div>
            <h2 v-if="data.tags.length == 1" class="info-title">🏷️ Теги</h2>
            <h2 v-else class="info-title">🏷️ Теги</h2>
            <p class="tags-list">{{ data.tags.map((t) => t.name).join(', ') }}</p>
          </div>
        </div>

        <!-- Издатели и авторы -->
        <div class="info-card">
          <div class="mb-6">
            <h2 class="info-title">
              <span v-if="data.publisher.length == 1">📢 Издатель</span
              ><span v-else>📢 Издатели</span>
            </h2>
            <div v-if="data.publisher.length" class="publisher-info">
              <div
                v-for="(publisher, index) in data.publisher.slice(0, 2)"
                :key="index"
                class="publisher-item"
              >
                <img
                  :src="publisher.cover.thumbnail"
                  :alt="publisher.name"
                  class="publisher-logo small"
                />
                <a :href="'/publisher/' + publisher.slug_url" class="publisher-link">
                  {{ publisher.name }}
                </a>
              </div>
            </div>
            <p v-else class="text-gray-500">Не указан</p>
          </div>

          <div>
            <h2 class="info-title">
              <span v-if="data.authors.length == 1">✍️ Автор</span><span v-else>✍️ Авторы</span>
            </h2>
            <ul class="authors-list">
              <li v-for="author in data.authors" :key="author.id" class="author-item">
                <img :src="author.cover.thumbnail" :alt="author.name" class="author-avatar" />
                <a :href="'/author/' + author.slug_url" class="author-link">{{ author.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div v-else class="loading-screen">
    <Loader class="text-blue-500 w-12 h-12 animate-spin" />
  </div>
</template>

<style scoped lang="postcss">
.tab-btn {
  @apply px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
         transition-colors hover:bg-gray-200 dark:hover:bg-gray-600;
}

.tab-btn.active {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.stats-grid {
  @apply mb-4;
}

.stat-item {
  @apply text-center;
}

.app-card {
  @apply transition-transform hover:scale-105 cursor-pointer;
}

.section-title {
  @apply text-xl font-bold text-gray-800 dark:text-white mb-4 pl-2 border-l-4 border-blue-500;
}

.related-card {
  @apply bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow;
}

.anime-detail-container {
  @apply py-8 bg-gray-50 dark:bg-gray-900 min-h-screen;
}

.info-title {
  @apply text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white;
}

.info-card {
  @apply bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md;
}

.team-item {
  @apply flex items-center gap-3 mb-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded;
}

.team-logo {
  @apply w-8 h-8 rounded-full object-cover;
}

.tags-list {
  @apply text-gray-700 dark:text-gray-400;
}

.authors-list {
  @apply space-y-2;
}

.author-item {
  @apply flex items-center gap-3;
}

.author-avatar {
  @apply w-8 h-8 rounded-full object-cover;
}

.loading-screen {
  @apply h-screen flex items-center justify-center;
}

.publisher-info {
  @apply flex items-center gap-3;
}

.publisher-logo.small {
  width: 60%;
  height: 60%;
}
</style>
