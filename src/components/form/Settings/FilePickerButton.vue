<template>
  <div class="flex justify-between items-center">
    <span class="text-gray-700 dark:text-gray-300">{{ label }}</span>
    <button
      @click="selectFile"
      class="w-3/5 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-center"
    >
      {{ filePath || "Browse..." }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { open } from "@tauri-apps/plugin-dialog";

const props = defineProps({
  filePath: { type: String, default: "" },
  label: { type: String, required: true },
  filters: {
    type: Array as () => { name: string; extensions: string[] }[],
    default: () => [],
  },
});

const emit = defineEmits(["update:filePath"]);

const filePath = computed({
  get: () => props.filePath,
  set: (val: string) => emit("update:filePath", val),
});

async function selectFile() {
  const selected = await open({
    title: props.label,
    multiple: false,
    filters: props.filters,
  });

  if (typeof selected === "string") {
    filePath.value = selected;
    console.log("Selected file:", selected);
  }
}
</script>
