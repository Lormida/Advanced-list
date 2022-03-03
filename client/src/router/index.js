import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/english-dictionary',
    name: 'EnglishDict',
    component: () => import('../views/EnglishDictionary.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
