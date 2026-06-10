<script setup lang="ts">
import ProjectModal from '@/components/projectsPage/ProjectModal.vue';
import TheProjectHeader from '@/components/projectsPage/TheProjectHeader.vue';
import TheProjectList from '@/components/projectsPage/TheProjectList.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { projectService } from '@/services/projectService';
import type { MemberMap } from '@/types/Member';
import { ProjectGroup, type Project } from '@/types/Project';
import { onMounted, ref, type Ref } from 'vue';

const projectGroup:Ref<ProjectGroup> = ref<ProjectGroup>(new ProjectGroup());

const memberMap:MemberMap = new Map();

onMounted(async ()=>{
    projectGroup.value = await projectService.getProjectsWithMembers();
    const saas = await projectService.getAllProjects();

    console.log(saas)
})

const isModalOpen = ref<boolean>(false);
</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheProjectHeader v-model="isModalOpen"/>
        </template>
        <TheProjectList v-model="isModalOpen" :project-group="projectGroup"/>
    </BaseLayout>

    <article v-if="isModalOpen" class="">
    <ProjectModal :member-map="projectGroup.membermap" v-model="isModalOpen"/>
    </article>
</template>