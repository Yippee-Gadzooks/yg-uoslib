<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon } from 'lucide-vue-next'

const query = ref('')
defineEmits(['processObjects'])
</script>

<template>
  <div
    class="search-container flex max-w-4xl mx-auto border-b-2 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 transition-colors"
  >
    <SearchIcon class="w-5 h-5 text-gray-400 my-auto mr-2" />
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      aria-label="Search"
      class="flex-grow py-3 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
      @keyup.enter="$emit('processObjects', query)"
    />
    <button
      type="button"
      class="ml-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label="Perform search"
      @click="$emit('processObjects', query)"
    >
      Go
    </button>
  </div>
</template>
