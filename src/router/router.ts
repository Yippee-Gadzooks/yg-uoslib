import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Library from "../pages/Library.vue";
import Object from "../pages/Object.vue";
import Player from "../pages/Player.vue";
import Preference from "../pages/Preference.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // Тут у нас поиск, всякие штучки и тд тп
  },
  {
    path: "/player/:slug_url/:model",
    name: "Player",
    component: Player, // Просмотр любых данных и тайтлов (т.е. буквально плеер)
  },
  {
    path: "/preferences",
    name: "Preference",
    component: Preference, // Настройки (и инстанса и клиента, но отдельно)
  },
  {
    path: "/library/",
    name: "Library",
    component: Library, //Все скачаные и тд
  },
  {
    path: "/object/:slug_url/:model",
    name: "Object",
    component: Object, //Юзер вся фигня, обжекты и так далее (как офлайн так и онлайн)
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
