<script setup lang="ts">
import { useThemeStore } from "./stores/theme";
import { useInstancesStore } from "./stores/instances";
import { useSettingsStore } from "./stores/preferences";

const settingsStore = useSettingsStore();
const instancesStore = useInstancesStore();
const themeStore = useThemeStore();

//import { ref } from "vue";
//import yaml from "js-yaml";

//import { resolveResource } from '@tauri-apps/api/path';
//import { readTextFile } from '@tauri-apps/plugin-fs';
//import { invoke } from "@tauri-apps/api/core";
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//greetMsg.value = await invoke("calc", { a: parseInt(a.value), b: parseInt(b.value) });
// nb.value = await invoke("b", {"model": "anime", "slugId": "19826--shinobi-no-ittoki-anime"});
//nb.value = await invoke("b", {});

//async function loadLangFile() {
//  const resourcePath = await resolveResource('config/main.yaml');
//
//  const fileContent = await readTextFile(resourcePath);
//  const config = yaml.load(fileContent);
//  console.log(config.user_id);
//}
//loadLangFile();
//import { invoke } from '@tauri-apps/api/core'

//const ua = navigator.userAgent
//await invoke('user_agent', { ua })

import DefaultLayout from "./layouts/DefaultLayout.vue";
</script>
<template>
  <DefaultLayout />
</template>
<style scoped></style>
