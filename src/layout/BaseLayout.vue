<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import TheProfileEditModal from '@/components/TheProfileEditModal.vue';
import { memberService } from '@/services/memberService';
import { useMemberStore } from '@/stores/memberStore';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref, type Ref } from 'vue';

const sidebarStore = useSidebarStore();
const userStore = useUserStore();

const urlDaImagem:Ref<string | null> = ref<string | null>(null);

const isEditProfileModalOpen:Ref<boolean> = ref<boolean>(false);

function openProfileEditModal(){
    isEditProfileModalOpen.value = true
}

onMounted(async ()=>{
    
    await userStore.setupPhoto();
})

</script>

<template>
    <div class="w-full h-full
                 flex flex-row gap-2 px-5">

        <section class="h-full 
                        content-center
                         "
                 :class="{'w-10/200':!sidebarStore.state, 'w-30/200':sidebarStore.state}">
            <TheSidebar @openProfileEdit="isEditProfileModalOpen = true"/>
        </section>
        <section class="h-full
                        items-center
                        flex 
                        "
                 :class="{'w-190/200':!sidebarStore.state, 'w-170/200':sidebarStore.state}">

            <div class="h-95/100 w-full 
                        flex flex-col 
                        gap-2">
                <slot name = "header"></slot>
                
                <div class="bg-white 
                            border border-gray-border
                            rounded-2xl
                            flex-1 min-h-0 overflow-hidden"> 
                        <slot :openEditModal="openProfileEditModal">
                            
                        </slot>
                </div>
            </div>
            
        </section>
        
    </div>

    <TheProfileEditModal v-if="isEditProfileModalOpen"
                         @close="isEditProfileModalOpen = false"/>

</template>