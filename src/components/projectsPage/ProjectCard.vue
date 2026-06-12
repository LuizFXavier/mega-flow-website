<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import { useProjectStore } from '@/stores/projectStore';
import type { MemberMap } from '@/types/Member';
import type { Project } from '@/types/Project';

interface Props{
    project:Project;
}

const projectStore = useProjectStore();

const {project} = defineProps<Props>();

const emit = defineEmits(['openModal']);

function handleClick(){

    projectStore.setFocusedProject(project);
    emit('openModal');
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
                ">
        <h1 class="text-xl">
            {{ project.titulo }}
        </h1>

        <div class="flex flex-row 
                    justify-between 
                    text-xs
                    py-3">
            <div class="flex place-items-center">
                <img src="/icon/projects/building.png"/>
                <h2>
                    Cliente <br>
                    <strong>{{ project.cliente }}</strong>
                </h2>
            </div>

            <div class="flex place-items-center">
                <img src="/icon/projects/calendar.png"/>
                <h2>
                    Prazo <br>
                    <strong>12 jun</strong>
                </h2>
            </div>

            <div class="flex place-items-center">
                <img src="/icon/projects/wallet.png"/>
                <h2>
                    Orçamento <br>
                    <strong>{{ project.orcamento }}</strong>
                </h2>
            </div>
        </div>

        <!-- <div v-for="{memberRga, funcao} in project.participants">
            <h2>
                funcao, {{ memberMap.get(memberRga) }}
            </h2>
        </div> -->

    </div>

</template>