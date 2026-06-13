<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts';
import TheHeader from '../TheHeader.vue';

const userStore = useUserStore();

const emit = defineEmits(['openCreateModal']);

function openCreateUserModal(){
    emit('openCreateModal')
}
</script>

<template>
    <TheHeader>
        <template v-slot:top>
            <div class="w-full flex">

                <h1 class="text-white text-4xl
                            font-inter
                            ">
                    Mega-membros
                </h1>
                
            </div>
            <div v-if="userStore.isAdmin()"
                class ="w-1/10
                        h-full
                        flex
                        justify-center
                        place-items-center
                        border-l-2
                        border-dashed
                        border-l-[#8A38F5]
                        ">
                
                <button @click="openCreateUserModal()" 
                        class="bg-[#D1D5DB]/25
                                border border-white
                                rounded-full
                                aspect-square
                                h-8/10
                                flex
                                justify-center
                                place-items-center
                                text-white text-4xl">
                    +
                </button>


            </div>
        </template>
    </TheHeader>
</template>