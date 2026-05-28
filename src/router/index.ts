import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import MembersView from '@/views/MembersView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/login', component: LoginView },
  { path: '/projects', component: ProjectsView },
  { path: '/members', component: MembersView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
