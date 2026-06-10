<script setup lang="ts">
import type { ProjectGroup } from '@/types/Project';
import ProjectCard from './ProjectCard.vue';

interface Props{
    projectGroup:ProjectGroup;
}

const {projectGroup} = defineProps<Props>();

const isModalOpen = defineModel<boolean>();

function openViewModal(){
    isModalOpen.value = true;
}

</script>

<template>
    <article class="w-full h-full
                    grid grid-cols-3
                    gap-4
                    grid-rows-3
                    p-4
                    ">

        <ProjectCard @open-modal="openViewModal" 
                    v-for="project in projectGroup.projects" 
                    :project="project" :member-map="projectGroup.membermap"/>
        <!-- <ProjectCard v-for="project in projectGroup.projects" :project="project" :member-map="projectGroup.membermap"/> -->
        <!-- <ProjectCard v-for="project in projectGroup.projects" :project="project" :member-map="projectGroup.membermap"/>
        <ProjectCard v-for="project in projectGroup.projects" :project="project" :member-map="projectGroup.membermap"/> -->
        
    </article>
</template>