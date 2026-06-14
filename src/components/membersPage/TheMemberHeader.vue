<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts';
import TheHeader from '../TheHeader.vue';
import { ref, watch, type Ref } from 'vue';
import TheSearchBar from '../TheSearchBar.vue';

const userStore = useUserStore();

const emit = defineEmits<{
  (e: 'search', input:string): void,
  (e: 'clearSearch'): void,
  (e: 'openCreateModal'):void
}>();

const searchInput:Ref<string> = ref<string>('');

watch(searchInput, (newValue) => {

  if (newValue.length === 0){
    emit('clearSearch');
  }
})

function search(){
    emit('search', searchInput.value);
}

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
                    Membros
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
        <template v-slot:bottom>
            <div class="flex 
                        justify-center
                        p-3
                        h-full
                        w-1/3">
                <TheSearchBar :text="'Buscar Membro'"
                              v-model="searchInput"
                              @confirm="search"/>
            </div>
        </template>
    </TheHeader>
</template>