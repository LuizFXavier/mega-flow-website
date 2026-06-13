<script setup lang="ts">
import type { MemberMap } from '@/types/Member';
import type { Project } from '@/types/Project';
import { computed } from 'vue';
import MemberPhoto from '../MemberPhoto.vue';
import { memberService } from '@/services/memberService';
import { useMemberStore } from '@/stores/memberStore';

interface Props{
    project:Project;
}

const visibleMembers = computed(()=>{
    return project.membros.slice(0,3);
})

const extraMembers = computed(()=>{
    return project.membros.length - visibleMembers.value.length;
})

const {project} = defineProps<Props>();

const emit = defineEmits(['openModal']);

const memberStore = useMemberStore();

function handleClick(){
    emit('openModal');
}

function formatDate(date: string | null | undefined): string {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
    });
}

</script>

<template>
    <div @click="handleClick" 
        class="bg-[#E2E2E2]
                border
                border-[#E2E2E2]
                rounded-xl
                px-3
                py-2
                hover:bg-white 
                hover:shadow-2xl
                hover:border
                hover:border-[#7C7C7C]/40
                cursor-pointer
                
                flex flex-col
                ">
        <h1 class="text-xl">
            {{ project.titulo }}
        </h1>

        <div class="flex flex-row 
                    justify-between 
                    text-xs
                    py-3
                    h-6/10">
            <div class="flex place-items-center">
                <img src="/icon/projects/building.png"/>
                <h2>
                    Cliente <br>
                    <strong>{{ project.cliente }}</strong>
                </h2>
            </div>

            <div v-if="formatDate(project.dataConclusao)" 
                class="flex place-items-center">
                <img src="/icon/projects/calendar.png"/>
                <div class="flex flex-col place-items-start">
                    <h2>
                        Prazo
                    </h2>
                    <strong>{{ formatDate(project.dataConclusao) }}</strong>

                </div>
            </div>

            <div class="flex place-items-center">
                <img src="/icon/projects/wallet.png"/>
                <h2>
                    Orçamento <br>
                    
                    <strong> R$ {{ project.orcamento.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) }}</strong>
                </h2>
            </div>
        </div>

        <div class="min-h-0 
                    flex-1 flex flex-row">
            <MemberPhoto v-for="member in visibleMembers"
                         :photo-url="memberStore.getPhoto(member.rga)"
                         class="bg-gray-main"/>
            <div v-if="extraMembers > 0"
                 class="bg-gray-main
                        aspect-square
                        rounded-full
                        flex justify-center
                        place-items-center
                        text-[#560197]">
                +{{ extraMembers }}
            </div>
        </div>

    </div>

</template>