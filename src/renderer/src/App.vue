<script setup lang="ts"></script>

<template>
  <strong>Current route path:</strong> {{ $route.fullPath }}
  <nav>
    <RouterLink to="/">Go to home</RouterLink>
    <br />
    <RouterLink to="/preferences">Go to preferences</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
