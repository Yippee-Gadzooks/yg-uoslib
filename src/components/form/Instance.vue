<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Instance } from "../../stores/instances";
import { useInstancesStore } from "../../stores/instances";
import { open } from "@tauri-apps/plugin-dialog";

const instancesStore = useInstancesStore();

const instance = ref<Instance>({
  id: "", // будет проигнорирован
  name: "",
  type: "folder",
  config: {
    path: "",
  },
});

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);

watch(
  () => instance.value.type,
  (type) => {
    // Меняем config, если тип сменился
    instance.value.config =
      type === "folder"
        ? { path: "" }
        : { host: "", port: 80, secure: false, apiPrefix: "" };
  },
);

async function selectFolder() {
  const selected = await open({ directory: true, multiple: false });
  if (typeof selected === "string") {
    instance.value.config = { path: selected };
  }
}

async function save() {
  await instancesStore.addInstance({
    name: instance.value.name,
    type: instance.value.type,
    config: instance.value.config,
  });
  emit("close");

  // Сброс
  instance.value = {
    id: "",
    name: "",
    type: "folder",
    config: {
      path: "",
    },
  };
}
</script>

<template>
  <transition name="fade">
    <!-- Затемнение фона -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <!-- Центрированный контейнер -->
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6"
      >
        <!-- Заголовок -->
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Manage Instance
        </h2>

        <!-- Общие поля -->
        <div class="mb-4">
          <label class="block mb-1 text-sm">Name</label>
          <input
            type="text"
            v-model="instance.name"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm">Type</label>
          <select
            v-model="instance.type"
            class="w-full border rounded px-3 py-2"
          >
            <option value="folder">Folder</option>
            <option value="server">Server</option>
          </select>
        </div>

        <!-- Folder config -->
        <div class="mb-4">
          <label class="block mb-1 text-sm">Path</label>
          <button
            @click="selectFolder"
            class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-left"
          >
            {{ instance.config.path || "Browse..." }}
          </button>
        </div>

        <!-- Server config -->
        <div v-if="instance.type === 'server'" class="space-y-4 mb-4">
          <div>
            <label class="block mb-1 text-sm">Host</label>
            <input
              type="text"
              v-model="instance.config.host"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block mb-1 text-sm">Port</label>
            <input
              type="number"
              v-model="instance.config.port"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="instance.config.secure" />
              <span>Use HTTPS</span>
            </label>
          </div>
          <div>
            <label class="block mb-1 text-sm">API Prefix (optional)</label>
            <input
              type="text"
              v-model="instance.config.apiPrefix"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex justify-end gap-2 mt-6">
          <button
            @click.self="emit('close')"
            class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            @click="save"
            class="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
