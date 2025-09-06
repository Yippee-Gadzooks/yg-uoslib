<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "../stores/theme";
import { useSettingsStore } from "../stores/preferences";
import SettingsCollapsible from "../components/features/Settings/SettingsCollapsible.vue";
import ToggleSwitch from "../components/form/Settings/ToggleSwitch.vue";
import SelectField from "../components/form/Settings/SelectField.vue";
import FilePickerButton from "../components/form/Settings/FilePickerButton.vue";

const settingsStore = useSettingsStore();
const themeStore = useThemeStore();

const isThemeLoaded = ref(false);

onMounted(async () => {
  await themeStore.loadTheme();
  isThemeLoaded.value = true;
});

// Dark mode toggle
const themeToggle = computed({
  get: () => themeStore.theme === "dark",
  set: (val: boolean) => themeStore.setTheme(val ? "dark" : "light"),
});

// Downloader type
const downloaderType = computed({
  get: () => settingsStore.getSetting("downloaderType") ?? "off",
  set: (val: "off" | "adaptive" | "auto") =>
    settingsStore.setSetting("downloaderType", val),
});

// Layout
const layout = computed({
  get: () => settingsStore.getSetting("layout") ?? "default",
  set: (val: "default" | "other") => settingsStore.setSetting("layout", val),
});

// FFmpeg path
const ffmpegPath = computed({
  get: () => settingsStore.getSetting("ffmpegPath") ?? "",
  set: (val: string) => settingsStore.setSetting("ffmpegPath", val),
});
</script>

<template>
  <div class="w-3/5 mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl">
    <h1
      class="text-2xl font-semibold text-center text-gray-900 dark:text-white"
    >
      Settings
    </h1>
    <p class="text-sm text-center text-gray-600 dark:text-gray-400">
      Customize your preferences below
    </p>

    <div class="mt-4 space-y-4">
      <!-- Design Section -->
      <SettingsCollapsible
        title="Design"
        description="Anything you need for design options."
      >
        <ToggleSwitch
          v-if="isThemeLoaded"
          label="Dark Mode"
          v-model="themeToggle"
        />
      </SettingsCollapsible>

      <!-- Downloader Section -->
      <SettingsCollapsible
        title="Downloader"
        description="Downloading, tools, other utility options."
      >
        <SelectField
          label="Download"
          :options="[
            { label: 'Off', value: 'off' },
            { label: 'Adaptive', value: 'adaptive' },
            { label: 'On', value: 'auto' },
          ]"
          v-model="downloaderType"
        />
        <FilePickerButton
          label="Select FFmpeg"
          v-model:filePath="ffmpegPath"
          :filters="[{ name: 'Executable', extensions: ['exe', ''] }]"
        />
      </SettingsCollapsible>

      <!-- Layout Section -->
      <SelectField
        label="Layout"
        :options="[
          { label: 'Default', value: 'default' },
          { label: 'Other', value: 'other' },
        ]"
        v-model="layout"
      />
    </div>
  </div>
</template>
