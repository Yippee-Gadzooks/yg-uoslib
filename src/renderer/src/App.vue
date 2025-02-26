<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userId = ref<string | null>(null)

onMounted(() => {
  userId.value = window.env?.USER_ID || 'No user ID found'
})
</script>
<template>
  <strong>Current route path:</strong> {{ $route.fullPath }}
  <br />
  <strong>Current user id:</strong> {{ userId }}
  <nav>
    <RouterLink to="/">Go to home</RouterLink>
    <br />
    <RouterLink to="/preferences">Go to preferences</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
