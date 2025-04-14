<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <div
    class="w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <button
      class="w-full flex justify-between items-center focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <div class="text-left">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <p v-if="description" class="text-sm text-gray-600 dark:text-gray-400">
          {{ description }}
        </p>
      </div>
      <svg
        class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      class="mt-3 pt-1 border-t border-gray-200 dark:border-gray-700 transition-all duration-200 overflow-hidden"
      :class="isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'"
    >
      <slot />
    </div>
  </div>
</template>
