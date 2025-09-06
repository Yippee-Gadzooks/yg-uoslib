// stores/settings.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { load } from "@tauri-apps/plugin-store";

let settingsStore: Awaited<ReturnType<typeof load>> | null = null;

const getSettingsStore = async () => {
  if (!settingsStore) {
    settingsStore = await load("app-settings.json", { autoSave: true });
  }
  return settingsStore;
};

export const useSettingsStore = defineStore("settings", () => {
  const settings = ref<Record<string, any>>({});
  const isLoaded = ref(false);

  const setSetting = async (key: string, value: any) => {
    settings.value[key] = value;
    const store = await getSettingsStore();
    await store.set(key, value);
    await store.save();
  };

  const getSetting = (key: string) => {
    return settings.value[key];
  };

  const loadSettings = async () => {
    const store = await getSettingsStore();
    const keys = await store.keys();
    const allSettings: Record<string, any> = {};
    for (const key of keys) {
      allSettings[key] = await store.get(key);
    }
    settings.value = allSettings;
    isLoaded.value = true;
  };

  // Загружаем при старте
  loadSettings();

  // Сохраняем автоматом при изменении settings (глубокий watch)
  watch(
    settings,
    async (newSettings) => {
      if (isLoaded.value) {
        const store = await getSettingsStore();
        for (const [key, value] of Object.entries(newSettings)) {
          await store.set(key, value);
        }
        await store.save();
      }
    },
    { deep: true },
  );

  return { settings, setSetting, getSetting, loadSettings };
});
