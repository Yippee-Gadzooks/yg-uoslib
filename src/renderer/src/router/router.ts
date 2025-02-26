import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Object from '../views/Object.vue'
import Preference from '../views/Preference.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/preferences',
    name: 'Preference',
    component: Preference
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: User
  },
  {
    path: '/object/:slug_url/:model',
    name: 'Object',
    component: Object
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
