// stores/instances.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { load } from "@tauri-apps/plugin-store";
import { v4 as uuidv4 } from "uuid";

export type InstanceType = "folder" | "server";

export interface Instance {
  id: string;
  name: string;
  type: InstanceType;
  config: FolderConfig | ServerConfig;
}

export interface FolderConfig {
  path: string;
}

export interface ServerConfig {
  host: string; // IP или домен
  port: number; // порт сервера
  secure: boolean; // https или http
  apiPrefix?: string; // необязательный префикс, например: /api
}

let instanceStoreFile: Awaited<ReturnType<typeof load>> | null = null;

const getInstancesStore = async () => {
  if (!instanceStoreFile) {
    instanceStoreFile = await load("instances.json", { autoSave: true });
  }
  return instanceStoreFile;
};

export const useInstancesStore = defineStore("instances", () => {
  const instances = ref<Instance[]>([]);
  const activeInstanceId = ref<string | null>(null);
  const isLoaded = ref(false);

  const loadInstances = async () => {
    const store = await getInstancesStore();
    instances.value = (await store.get<Instance[]>("instances")) ?? [];
    activeInstanceId.value =
      (await store.get<string | null>("activeInstanceId")) ?? null;
    isLoaded.value = true;
  };

  const saveInstances = async () => {
    const store = await getInstancesStore();
    await store.set("instances", instances.value);
    await store.set("activeInstanceId", activeInstanceId.value);
    await store.save();
  };

  const addInstance = async (data: Omit<Instance, "id">) => {
    const newInstance: Instance = {
      ...data,
      id: uuidv4(),
    };
    instances.value.push(newInstance);
    await saveInstances();
  };

  const removeInstance = async (id: string) => {
    instances.value = instances.value.filter((inst) => inst.id !== id);
    if (activeInstanceId.value === id) activeInstanceId.value = null;
    await saveInstances();
  };

  const setActiveInstance = async (id: string | null) => {
    activeInstanceId.value = id;
    await saveInstances();
  };

  const getActiveInstance = () => {
    return (
      instances.value.find((inst) => inst.id === activeInstanceId.value) ?? null
    );
  };

  // Автосохранение при изменениях
  watch([instances, activeInstanceId], () => {
    if (isLoaded.value) saveInstances();
  });

  // Инициализация
  loadInstances();

  return {
    instances,
    activeInstanceId,
    isLoaded,
    loadInstances,
    addInstance,
    removeInstance,
    setActiveInstance,
    getActiveInstance,
  };
});
