<script setup lang="ts">
import type { ProjectGroup } from '@/types/Project';
import ProjectCard from './ProjectCard.vue';


interface Props{
    projectGroup:ProjectGroup;
}

const {projectGroup} = defineProps<Props>();

</script>

<template>
    <article class="w-full h-full
                    grid">

        <section v-for="project in projectGroup.projects">
            <ProjectCard :project="project" :member-map="projectGroup.membermap"/>
        </section>
    </article>
</template>