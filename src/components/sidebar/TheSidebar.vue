<script setup lang="ts">
import { useRouter } from 'vue-router'
import SidebarNav from './SidebarNav.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const isSideBarOpen = defineModel<boolean>();

function handleLogout(){
    authStore.logout();
    router.push('/login')
}

function toggleSidebar(){
    isSideBarOpen.value = !isSideBarOpen.value;
}

</script>
<template>
    <div class="flex flex-col 
                bg-white border border-gray-border rounded-2xl
                w-full h-95/100
                "
          @click="toggleSidebar"
                    >
        <div class="w-full h-1/10 
                    bg-linear-to-r from-mega-dark to-mega-light
                    rounded-t-2xl
                    flex
                    place-items-center
                    justify-end
                    ">

            <SidebarNav target-route="/projects" icon-url="/icon/sidebar/projects.png"/>
        </div>

        <SidebarNav target-route="/" 
                    icon-url="/icon/sidebar/menu.png"
                    :is-sidebar-open="isSideBarOpen">
            Início
        </SidebarNav>

        <SidebarNav target-route="/projects" 
                    icon-url="/icon/sidebar/projects.png"
                    :is-sidebar-open="isSideBarOpen">
            Projetos
        </SidebarNav>
        
        <SidebarNav target-route="/members" 
                    icon-url="/icon/sidebar/members.png"
                    :is-sidebar-open="isSideBarOpen">
            Membros            
        </SidebarNav>

        <button @click="handleLogout"
                class="justify-center 
                       flex
                        mt-4">
            <img src="/icon/sidebar/log-out.png" alt="icon">
        </button>
    </div>
</template>