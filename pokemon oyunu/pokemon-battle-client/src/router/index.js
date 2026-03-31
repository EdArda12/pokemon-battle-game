import { createRouter, createWebHistory } from 'vue-router'
import SelectPokemonView from '@/views/SelectPokemonView.vue'

const routes = [
  {
    path: '/',
    component: SelectPokemonView
  },
  {
    path: '/select',
    component: SelectPokemonView
  },
  {
    path: '/battle',
    component: () => import('@/components/BattleScreen.vue')
  },
  {
    path: '/result',
    component: () => import('@/components/ResultScreen.vue')
  },
  {
    path: '/history',
    component: () => import('@/components/BattleHistory.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
