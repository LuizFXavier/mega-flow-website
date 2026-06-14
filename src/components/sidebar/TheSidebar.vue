<script setup lang="ts">
import { useRouter } from 'vue-router'
import SidebarNav from './SidebarNav.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { ref } from 'vue';
import type { SidebarEntry } from '@/types/SidebarEntry.ts';
import { useSidebarStore } from '@/stores/sidebarStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { memberService } from '@/services/memberService.ts';
import { Member } from '@/types/Member.ts';
import MemberPhoto from '../MemberPhoto.vue';
import { useMemberStore } from '@/stores/memberStore.ts';

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const userStore = useUserStore();
const router = useRouter();

const isSideBarOpen = defineModel<boolean>();

const emit = defineEmits(['openProfileEdit']);

const cargoMap = new Map<string, string>([
    ["MEMBRO", "Membro"],
    ["DIRETOR", "Diretor"],
    ["ADMINISTRADOR", "Administrador"]
])

function formatDate(){
    return new Date(userStore.user.dataIngresso).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

const memberStore = useMemberStore();

function openEdit(){
    memberStore.setFocusedMember(userStore.user, -1);    
    emit('openProfileEdit');
}

function handleLogout(){
    sidebarStore.state = false;
    authStore.logout();
    router.push('/login')
}

async function toggleSidebar(){
    sidebarStore.toggle();
}

</script>
<template>
    <div class="flex flex-col 
                bg-white border border-gray-border rounded-2xl
                w-full h-95/100
                relative
                "
          @click="toggleSidebar"
                    >

        <div class="w-full h-1/10
                    absolute
                    bg-linear-to-r from-mega-dark to-mega-light
                    rounded-t-2xl">
        </div>

        <section v-if="!sidebarStore.state"
             class="w-full h-1/10
                    z-10
                    rounded-t-2xl
                    flex
                    place-items-center
                    justify-end
                    ">
                    
            <div class="w-full p-2">
                <MemberPhoto :photo-url="userStore.photo()"
                            class="bg-[#E2E2E2]"/>
            </div>

        </section>

        <section v-else 
            class=" h-2/10 w-full
                    z-10
                    flex justify-center items-center">
            <div class="relative w-24 h-24 2xl:w-30 2xl:h-30">
        
                <MemberPhoto :photo-url="userStore.photo()"
                            class="bg-[#E2E2E2] w-full h-full rounded-full object-cover"/>
                
                <button @click.stop="openEdit"
                        class="absolute -bottom-1 -right-2 
                            hover:bg-gray-100 
                            rounded-lg p-1.5 
                            flex items-center justify-center">
                            
                    <img src="/icon/edit.png" class="w-5 h-5 object-contain" alt="Editar">
                </button>
                
            </div>

    </section>

        <section v-if="sidebarStore.state"
                    class= "flex flex-col
                            justify-center
                            place-items-center
                            gap-2
                            ">
            <h1 class="text-xl">
                <strong>{{ userStore.user.nome }}</strong>
            </h1>
            <h2 class="text-[#767676] text-base">
                {{ cargoMap.get(userStore.user.cargo) }}
            </h2>
            <h2 class="text-[#6B6B6B] text-sm">
                Ingressou em {{ formatDate() }}
            </h2>
        </section>

        <SidebarNav target-route="/" 
                    icon-url="/icon/sidebar/menu.png"
                    :is-sidebar-open="sidebarStore.state"
                    :marked="sidebarStore.entry == 'inicio'">
            Início
        </SidebarNav>

        <SidebarNav target-route="/projects" 
                    icon-url="/icon/sidebar/projects.png"
                    :is-sidebar-open="sidebarStore.state"
                    :marked="sidebarStore.entry == 'projetos'">
            Projetos
        </SidebarNav>
        
        <SidebarNav target-route="/members" 
                    icon-url="/icon/sidebar/members.png"
                    :is-sidebar-open="isSideBarOpen"
                    :marked="sidebarStore.entry == 'membros'">
            Membros            
        </SidebarNav>

        <div v-if="!sidebarStore.state"
             class="w-full 
                       flex 
                       justify-center 
                       py-4 
                       ">

            <button @click.stop="handleLogout"
                    class= "w-8/10 
                    aspect-square 
                    flex 
                    items-center justify-center
                    rounded-full 
                    transition-all 
                    duration-200
                    bg-transparent hover:bg-gray-200">
                <img src="/icon/sidebar/log-out.png" alt="icon">
            </button>
        </div>

        <div v-else="!sidebarStore.state"
             class="w-full
                        flex
                        place-items-center
                        gap-2
                        p-2
                        py-4
                        group
                        justify-center
                        ">

            <button @click.stop="handleLogout"
                    class= "w-9/10 
                            p-2 
                            flex 
                            gap-5 
                            items-center 
                            rounded-xl 
                            transition-all 
                            duration-200
                            bg-transparent group-hover:bg-gray-200">
                <img src="/icon/sidebar/log-out.png" alt="icon">

                <h1 class="font-bold">
                    Sair
                </h1>
            </button>
        </div>

    </div>
</template>