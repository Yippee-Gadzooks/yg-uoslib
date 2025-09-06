<template>
  <div class="flex justify-between items-center">
    <span class="text-gray-700 dark:text-gray-300">{{ label }}</span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        class="hidden"
        :checked="model"
        @change="onChange"
      />
      <div class="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative">
        <div
          class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-300"
          :class="{ 'translate-x-5': model }"
        ></div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

// Локальная связь с prop через computed
const model = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});

// Обработчик изменения
function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
}
</script>
