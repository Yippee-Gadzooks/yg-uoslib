<template>
  <div class="flex justify-between items-center">
    <span class="text-gray-700 dark:text-gray-300">{{ label }}</span>
    <select
      class="w-3/5 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-center"
      :value="model"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array as () => { label: string; value: any }[],
    required: true,
  },
  label: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

// Локальная computed для двусторонней привязки
const model = computed({
  get: () => props.modelValue,
  set: (val: any) => emit("update:modelValue", val),
});

// Обработчик изменения select
function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  model.value = target.value;
}
</script>
