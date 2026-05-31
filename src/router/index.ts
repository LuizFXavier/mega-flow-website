import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import MembersView from '@/views/MembersView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { requireAnon, requireAuth } from './requirement'

const routes = [
  { path: '/', 
    component: DashboardView,
    meta:{
      auth : true
    } 
  },
  { path: '/login', 
    component: LoginView,
    meta:{
      auth : false
    } 
  },
  { path: '/projects',
    component: ProjectsView,
    meta:{
      auth : true
    } 
  },
  { path: '/members', 
    component: MembersView,
    meta:{
      auth : true
    } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) =>{
  if(to.meta?.auth){
    return requireAuth(to, from);
  }
  else{
    return requireAnon(to, from);
  }
})

export default router
