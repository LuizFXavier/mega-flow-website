import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import MembersView from '@/views/MembersView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { requireAnon, requireAuth } from './requirement'
import { useSidebarStore } from '@/stores/sidebarStore'
import type { SidebarEntry } from '@/types/SidebarEntry'

const routes = [
  { path: '/', 
    component: DashboardView,
    meta:{
      auth : true,
      siderbarEntry:'inicio'
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
      auth : true,
      siderbarEntry:'projetos'
    } 
  },
  { path: '/members', 
    component: MembersView,
    meta:{
      auth : true,
      siderbarEntry:'membros'
    } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) =>{
  if(to.meta?.auth){
    const sidebarStore = useSidebarStore();
    
    if (to.meta?.siderbarEntry){
      const siderbarEntry = to.meta.siderbarEntry as SidebarEntry;
      sidebarStore.set(siderbarEntry);
    }
    return requireAuth(to, from);
  }
  else{
    return requireAnon(to, from);
  }
})

export default router
