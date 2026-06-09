<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts';
import TheHeader from '../TheHeader.vue';
import TheSearchBar from '../TheSearchBar.vue';
import { AuthLevel } from '@/types/AuthorizationLevel.ts';

const userStore = useUserStore();

function openCreateProjectModal(){

}
</script>

<template>
    <TheHeader>
        <template v-slot:top>
            <div class="w-9/10 flex">

                <h1 class="text-white text-4xl
                            font-inter
                            ">
                    Projetos
                </h1>
                
            </div>
            <div v-if="userStore.level >= AuthLevel.DIRECTOR"
                class ="w-1/10
                        h-full
                        flex
                        justify-center
                        place-items-center
                        border-l-2
                        border-dashed
                        border-l-[#8A38F5]
                        ">
                
                <button @click="openCreateProjectModal()" 
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

        <template v-slot:bottom>
            <div class="flex 
                        justify-center
                        p-3
                        h-full
                        w-1/3">
                <TheSearchBar :text="'Buscar Projeto'"/>
            </div>
        </template>
    </TheHeader>
</template>