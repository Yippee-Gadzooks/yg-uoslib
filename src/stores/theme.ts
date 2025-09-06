import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { load } from "@tauri-apps/plugin-store";

let themeStore: Awaited<ReturnType<typeof load>> | null = null;

const getThemeStore = async () => {
  if (!themeStore) {
    themeStore = await load("theme-settings.json", { autoSave: true });
  }
  return themeStore;
};

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<"light" | "dark">("light");
  const isLoaded = ref(false);

  const setTheme = async (newTheme: "light" | "dark") => {
    theme.value = newTheme;
    const store = await getThemeStore();
    await store.set("theme", newTheme);
    await store.save();
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const loadTheme = async () => {
    const store = await getThemeStore();
    const saved = await store.get<"light" | "dark">("theme");
    const loadedTheme = saved === "dark" ? "dark" : "light";

    theme.value = loadedTheme;
    document.documentElement.classList.toggle("dark", loadedTheme === "dark");
    isLoaded.value = true;
  };

  // только после загрузки запускаем watcher
  loadTheme().then(() => {
    watch(theme, (newVal) => {
      if (isLoaded.value) {
        setTheme(newVal);
      }
    });
  });

  return { theme, setTheme, loadTheme };
});
