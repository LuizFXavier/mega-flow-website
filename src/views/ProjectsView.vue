<script setup lang="ts">
import ProjectModal from '@/components/projectsPage/modal/ProjectModal.vue';
import TheProjectHeader from '@/components/projectsPage/TheProjectHeader.vue';
import TheProjectList from '@/components/projectsPage/TheProjectList.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { projectService } from '@/services/projectService';
import { useMemberStore } from '@/stores/memberStore';
import { type Project } from '@/types/Project';
import { onMounted, ref, type Ref } from 'vue';

const projects:Ref<Project[]> = ref<Project[]>([]);

const memberStore = useMemberStore();

function handleCreation(project:Project){
    projects.value.push(project);
}

function handleDelete(index:number){
    projects.value.splice(index, 1);
}

onMounted(async ()=>{
    projects.value = await projectService.getAllProjects();
    
    await memberStore.setupMembers();
    await memberStore.setupMembersPhotos();
})

const isModalOpen = ref<boolean>(false);
</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheProjectHeader v-model="isModalOpen"/>
        </template>
        <TheProjectList v-model="isModalOpen" :projects="projects"/>
    </BaseLayout>

    <article v-if="isModalOpen" class="">
        <ProjectModal v-model="isModalOpen"
            @create-project="handleCreation"
            @delete-project="handleDelete"
            />
    </article>
</template>