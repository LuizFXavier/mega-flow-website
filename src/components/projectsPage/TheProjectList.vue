<script setup lang="ts">
import type { Project} from '@/types/Project';
import ProjectCard from './ProjectCard.vue';
import { useProjectStore } from '@/stores/projectStore.ts';

interface Props{
    projects:Project[];
}

const {projects} = defineProps<Props>();

const isModalOpen = defineModel<boolean>();

const projectStore = useProjectStore();

function openViewModal(project:Project, index:number){
    projectStore.setFocusedProject(project, index);
    isModalOpen.value = true;
}

</script>

<template>
    <article class="w-full h-full
                    grid grid-cols-3
                    gap-4
                    grid-rows-3
                    p-4
                    overflow-y-auto
                    ">
        
        <ProjectCard v-for="(project, index) in projects" 
                    @open-modal="openViewModal(project, index)"
                    :project="project"/>
        
    </article>
</template>