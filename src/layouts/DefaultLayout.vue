<template>
  <div
    class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <Topbar />
    <main class="flex-grow mt-20">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Topbar from "../components/layout/TopBar.vue";
import Footer from "../components/layout/Footer.vue";
</script>
