<script setup lang="ts">
import { useRouter } from 'vue-router'
import SidebarNav from './SidebarNav.vue';
import { useAuthStore } from '@/stores/authStore.ts';

const authStore = useAuthStore();
const router = useRouter();

function handleLogout(){
    authStore.logout();
    router.push('/login')
}

</script>
<template>
    <div class="flex flex-col 
                    bg-white border border-gray-border rounded-2xl
                    w-full h-95/100
                    
                    ">
        <div class="w-full h-1/10 
                    bg-linear-to-r from-mega-dark to-mega-light
                    rounded-t-2xl
                    flex
                    place-items-center
                    ">

            <SidebarNav target-route="/projects" icon-url="/icon/sidebar/projects.png"/>
        </div>

        <SidebarNav target-route="/" icon-url="/icon/sidebar/menu.png"/>
        <SidebarNav target-route="/projects" icon-url="/icon/sidebar/projects.png"/>
        <SidebarNav target-route="/members" icon-url="/icon/sidebar/members.png"/>

        <button @click="handleLogout"
                class="justify-items-center 
                        mt-4">
            <img src="/icon/sidebar/log-out.png" alt="icon">
        </button>
    </div>
</template>