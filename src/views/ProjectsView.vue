<script setup lang="ts">
import TheProjectHeader from '@/components/projectsPage/TheProjectHeader.vue';
import TheProjectList from '@/components/projectsPage/TheProjectList.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { projectService } from '@/services/projectService';
import type { MemberMap } from '@/types/Member';
import type { Project } from '@/types/Project';
import { onMounted, ref, type Ref } from 'vue';

const projects:Ref<Project[]> = ref<Project[]>([]);

const memberMap:MemberMap = new Map();

onMounted(async ()=>{
    const projects = await projectService.getAllProjects();

    console.log(projects);
})
</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheProjectHeader/>
        </template>
        <TheProjectList/>
    </BaseLayout>
</template>