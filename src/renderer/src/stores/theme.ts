import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')

  const setTheme = (newTheme: 'light' | 'dark'): void => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Следим за изменениями и сразу применяем тему
  watch(theme, setTheme, { immediate: true })

  return { theme, setTheme }
})
