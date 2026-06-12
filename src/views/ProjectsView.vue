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

const matchedProjects:Ref<Project[]> = ref<Project[]>([]);

const memberStore = useMemberStore();

function handleCreation(project:Project){
    projects.value.push(project);
}

async function handleDelete(index:number){
    matchedProjects.value.splice(index, 1);
    projects.value = await projectService.getAllProjects();
}

async function handleSearch(input:string){
    console.log(input)
    matchedProjects.value = await projectService.searchProjectByTitle(input);
}

function clearSearch(){
    matchedProjects.value = projects.value;
}

const isModalOpen = ref<boolean>(false);

onMounted(async ()=>{
    projects.value = await projectService.getAllProjects();

    matchedProjects.value = projects.value;
    
    await memberStore.setupMembers();
    await memberStore.setupMembersPhotos();
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheProjectHeader v-model="isModalOpen"
                                @search="handleSearch"
                                @clear-search="clearSearch"
                                />
        </template>
        <TheProjectList v-model="isModalOpen" :projects="matchedProjects"/>
    </BaseLayout>

    <article v-if="isModalOpen" class="">
        <ProjectModal v-model="isModalOpen"
            @create-project="handleCreation"
            @delete-project="handleDelete"
            />
    </article>
</template>